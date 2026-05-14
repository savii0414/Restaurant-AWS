export type Restaurant = {
  name: string;
  cuisine: string;
  rating: string | number;
  review: string;
  restaurantId?: string;
};

type DynamoResponse = {
  Items: Restaurant[];
  Count: number;
  ScannedCount?: number;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// -------------------- HANDLE RESPONSE --------------------
async function handleRes(res: Response) {
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}

// -------------------- GET RESTAURANTS --------------------
export async function getRestaurants(): Promise<DynamoResponse> {
  const res = await fetch(`${BASE_URL}/restaurants`);
  return handleRes(res);
}

// -------------------- ADD RESTAURANT --------------------
export async function addRestaurant(data: Restaurant) {
  const res = await fetch(`${BASE_URL}/restaurants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return handleRes(res);
}