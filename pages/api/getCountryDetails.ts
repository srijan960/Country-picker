import axios from 'axios';
import type { NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function getCountryDetails(
  res: NextApiResponse<Data>
) {
  let data : any;
  axios.get('https://restcountries.com/#api-endpoints-v2-all').then((response : any ) => {
    data = response.data;
  });
  res.status(200).json(data)
}
