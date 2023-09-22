export function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
}

// HTTP GET
export async function fetchGET(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Gagal mendapatkan data.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}