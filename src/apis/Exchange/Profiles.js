import { fetchStore } from '../../stores/userSession-store';
import { makeCall } from './ExchangeClient';

export const getProfiles = async () => {
  const { port, httpHost } = await fetchStore();

  const path = '/profiles';
  const url = `${httpHost}:${port}/api/exchange/profiles`;

  try {
    const fetchProfile = await makeCall('GET', url, path, '');

    const profileList = await fetchProfile.json();

    return profileList;
  } catch (e) {
    return e;
  }
};
