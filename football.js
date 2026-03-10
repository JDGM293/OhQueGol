exports.handler = async (event) => {
  const API_KEY = '50a74ba6cb9f4932804f121bd18455b9';
  const { competition, matchday, status, dateFrom, dateTo } = event.queryStringParameters || {};

  if (!competition) {
    return { statusCode: 400, body: JSON.stringify({ error: 'competition required' }) };
  }

  let url = `https://api.football-data.org/v4/competitions/${competition}/matches`;
  const params = [];
  if (matchday) params.push(`matchday=${matchday}`);
  if (status) params.push(`status=${status}`);
  if (dateFrom) params.push(`dateFrom=${dateFrom}`);
  if (dateTo) params.push(`dateTo=${dateTo}`);
  if (params.length) url += '?' + params.join('&');

  try {
    const response = await fetch(url, {
      headers: { 'X-Auth-Token': API_KEY }
    });
    const data = await response.json();
    return {
      statusCode: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
