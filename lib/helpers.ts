interface postDataProps {
  url: string;
  data?: any;
}

export const postData = async ({ url, data }: postDataProps) => {
  const res: Response = await fetch(url, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin',
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.log('Error in POST', { url, data, res });

    throw new Error(res.statusText);
  }

  return res.json();
};
