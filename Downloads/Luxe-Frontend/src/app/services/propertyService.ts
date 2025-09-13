import { Property as LibProperty, fetchProperties } from "@/lib/properties";

export type Property = LibProperty;

export interface PropertySearchParams {
  search?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  minBathrooms?: number;
  page?: number;
  limit?: number;
  sort?: "price-asc" | "price-desc" | "newest" | "oldest";
}

export interface PropertySearchResult {
  properties: Property[];
  count: number;
  totalPages: number;
}

export async function searchProperties(params: PropertySearchParams): Promise<PropertySearchResult> {
  const allProperties = await fetchProperties();

  // Filtering
  let filtered = allProperties.filter((p) => {
    const matchesSearch =
      !params.search ||
      p.title.toLowerCase().includes(params.search.toLowerCase()) ||
      p.location.toLowerCase().includes(params.search.toLowerCase()) ||
      p.city.toLowerCase().includes(params.search.toLowerCase()) ||
      p.region.toLowerCase().includes(params.search.toLowerCase()) ||
      p.description.toLowerCase().includes(params.search.toLowerCase());

    const matchesType = !params.propertyType || p.propertyType.toLowerCase() === params.propertyType.toLowerCase();
    const matchesMinPrice = !params.minPrice || p.price >= params.minPrice;
    const matchesMaxPrice = !params.maxPrice || p.price <= params.maxPrice;
    const matchesMinBedrooms = !params.minBedrooms || p.bedrooms >= params.minBedrooms;
    const matchesMinBathrooms = !params.minBathrooms || p.bathrooms >= params.minBathrooms;

    return (
      matchesSearch &&
      matchesType &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesMinBedrooms &&
      matchesMinBathrooms
    );
  });

  // Sorting
  if (params.sort) {
    filtered = filtered.slice().sort((a, b) => {
      switch (params.sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "oldest":
          return a.id - b.id;
        case "newest":
        default:
          return b.id - a.id;
      }
    });
  }

  // Pagination
  const page = params.page ?? 1;
  const limit = params.limit ?? 6;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = filtered.slice(start, end);

  return {
    properties: paginated,
    count: filtered.length,
    totalPages: Math.max(1, Math.ceil(filtered.length / limit)),
  };
}

export async function getPropertyById(id: number): Promise<Property | undefined> {
  const allProperties = await fetchProperties();
  return allProperties.find((p) => p.id === id);
}