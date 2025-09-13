/* eslint-disable @typescript-eslint/no-unused-vars */

// lib/authService.js
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  browserLocalPersistence,
  setPersistence,
  browserPopupRedirectResolver,
  sendEmailVerification
} from "firebase/auth";
import { auth } from "./firebase";

// Initialize auth persistence
if (typeof window !== 'undefined') {
  setPersistence(auth, browserLocalPersistence)
    .catch((error) => {
      console.error("Error setting auth persistence:", error);
    });
}

// Detect if user is on mobile device
const isMobile = () => {
  return typeof window !== 'undefined' && (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth <= 768
  );
};

// Detect if we're in a webview (common cause of popup issues)
const isWebView = () => {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent;
  return (
    /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(ua) ||
    /Android.*(wv|\.0\.0\.0)/i.test(ua) ||
    /Facebook/i.test(ua) ||
    /FBAN|FBAV/i.test(ua) ||
    /Instagram/i.test(ua) ||
    /LinkedInApp/i.test(ua) ||
    /TwitterAndroid/i.test(ua) ||
    /Line/i.test(ua)
  );
};

// Create Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
googleProvider.addScope('email');
googleProvider.addScope('profile');
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');

export const authService = {
  // Check for redirect result on app initialization
  async checkRedirectResult() {
    if (typeof window === 'undefined') {
      return { success: false, error: "Auth not available in server environment" };
    }
  
    try {
      const result = await getRedirectResult(auth);
      console.log("getRedirectResult output:", result); // 👈 debug line
  
      if (!result) {
        return { success: false, result: null };
      }
  
      await result.user.getIdToken(true); // Force token refresh
  
      return {
        success: true,
        user: result.user,
        isNewUser: result.metadata?.creationTime === result.metadata?.lastSignInTime
      };
    } catch (error) {
      console.error('Redirect result error:', error);
      return {
        success: false,
        error: this.getErrorMessage(error.code)
      };
    }
  },
  

  // Email/Password Registration
  async registerWithEmail(email, password, firstName, lastName) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update the user's display name
      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`
      });

      return {
        success: true,
        user: userCredential.user
      };
    } catch (error) {
      return {
        success: false,
        error: this.getErrorMessage(error.code)
      };
    }
  },

  // Email/Password Sign In
  async signInWithEmail(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return {
        success: true,
        user: userCredential.user
      };
    } catch (error) {
      return {
        success: false,
        error: this.getErrorMessage(error.code)
      };
    }
  },

  // Google Sign In - Mobile Friendly
  async signInWithGoogle() {
    // Early return if not in browser environment
    if (typeof window === 'undefined') {
      return {
        success: false,
        error: "Google sign-in not available in server environment"
      };
    }

    try {
      // Force redirect on mobile devices or webviews
      if (isMobile() || isWebView()) {
        console.log('Using redirect method for mobile or webview');
        await signInWithRedirect(auth, googleProvider);
        return { 
          success: true, 
          redirecting: true,
          message: 'Redirecting to Google...' 
        };
      } else {
        // Use popup for desktop
        console.log('Using popup method for desktop');
        const result = await signInWithPopup(auth, googleProvider);
        return {
          success: true,
          user: result.user,
          isNewUser: result.metadata?.creationTime === result.metadata?.lastSignInTime
        };
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      
      // If popup was blocked, fallback to redirect
      if (error.code === 'auth/popup-blocked' || error.code === 'auth/popup-closed-by-user') {
        try {
          console.log('Popup blocked, falling back to redirect');
          await signInWithRedirect(auth, googleProvider);
          return { 
            success: true, 
            redirecting: true,
            message: 'Redirecting to Google...' 
          };
        } catch (redirectError) {
          return {
            success: false,
            error: this.getErrorMessage(redirectError.code)
          };
        }
      }
      
      return {
        success: false,
        error: this.getErrorMessage(error.code)
      };
    }
  },

  // Phone Number Authentication
  async setupRecaptcha(containerId) {
    if (typeof window === 'undefined') {
      return {
        success: false,
        error: "reCAPTCHA not available in server environment"
      };
    }

    try {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved
        }
      });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: this.getErrorMessage(error.code)
      };
    }
  },

  async sendPhoneVerification(phoneNumber) {
    try {
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      return {
        success: true,
        confirmationResult
      };
    } catch (error) {
      return {
        success: false,
        error: this.getErrorMessage(error.code)
      };
    }
  },

  async verifyPhoneCode(confirmationResult, code) {
    try {
      const result = await confirmationResult.confirm(code);
      return {
        success: true,
        user: result.user
      };
    } catch (error) {
      return {
        success: false,
        error: this.getErrorMessage(error.code)
      };
    }
  },

  // Sign Out
  async signOut() {
    try {
      await firebaseSignOut(auth);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: this.getErrorMessage(error.code)
      };
    }
  },

  // Password Reset
  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: this.getErrorMessage(error.code)
      };
    }
  },

  // Email Verification
  async sendEmailVerification(user) {
    if (user) {
      await sendEmailVerification(user); // This is the Firebase function
    }
  },

  // Auth State Observer
  onAuthStateChanged(callback) {
    return onAuthStateChanged(auth, callback);
  },

  // Get current user
  getCurrentUser() {
    return auth.currentUser;
  },

  // Error message handler
  getErrorMessage(errorCode) {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No account found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/email-already-in-use':
        return 'An account with this email already exists.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters long.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/user-disabled':
        return 'This account has been disabled.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection.';
      case 'auth/popup-closed-by-user':
        return 'Sign-in cancelled.';
      case 'auth/cancelled-popup-request':
        return 'Sign-in cancelled.';
      case 'auth/popup-blocked':
        return 'Popup blocked. Please allow popups and try again.';
      case 'auth/invalid-phone-number':
        return 'Please enter a valid phone number.';
      case 'auth/invalid-verification-code':
        return 'Invalid verification code. Please try again.';
      case 'auth/code-expired':
        return 'Verification code has expired. Please request a new one.';
      case 'auth/invalid-credential':
        return 'Invalid credentials provided.';
      case 'auth/argument-error':
        return 'Invalid authentication argument. Please refresh and try again.';
      default:
        return 'An error occurred. Please try again.';
    }
  }
};