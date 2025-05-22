// page-header.tsx
import Add from './add-button';

interface PageHeaderProps {
  title: string;
  addButtonLabel?: string;
  pageType: 'events' | 'teams' | 'books' | 'branches' | 'testimonies' | 'gallery';
  onAdd?: (newItem: any) => void;
}

export default function PageHeader({ title, addButtonLabel, pageType, onAdd }: PageHeaderProps) {
  return (
    <div className="header mt-14 flex ms-12 me-12 w-[calc(100vw-(20rem)]">
      <h1 className="text-[var(--purple)] underline underline-offset-[0.5rem]">{title}</h1>
      {addButtonLabel && (
        <div className="case ms-auto -me-10">
          <Add 
            label={addButtonLabel} 
            pageType={pageType} 
            onAdd={onAdd}
          />
        </div>
      )}
    </div>
  );
}