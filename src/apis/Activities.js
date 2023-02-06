/**
 * Copyright 2022-present Coinbase Global, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { fetchStore } from '../stores/userSession-store';
import { makeCall } from './PrimeClient';

export const getActivities = async (queryParams) => {
  const { port, portfolioId, httpHost } = await fetchStore();

  const getActivitiesUrl = `${httpHost}:${port}/api/v1/portfolios/${portfolioId}/activities?${queryParams}`;

  const path = `/v1/portfolios/${portfolioId}/activities`;

  try {
    const fetchActivities = await makeCall('GET', getActivitiesUrl, path, '');

    const activitiesList = await fetchActivities.json();
    return activitiesList.activities;
  } catch (e) {
    return e;
  }
};

export const getActivityId = async (activitiesId) => {
  const { port, portfolioId, httpHost } = await fetchStore();
  const getActivitiesIdUrl = `${httpHost}:${port}/api/v1/portfolios/${portfolioId}/activities/${activitiesId}`;
  const path = `/v1/portfolios/${portfolioId}/activities/${activitiesId}`;

  try {
    const fetchActivitiesId = await makeCall(
      'GET',
      getActivitiesIdUrl,
      path,
      ''
    );
    const activitiesResponse = await fetchActivitiesId.json();

    return activitiesResponse.activity;
  } catch (e) {
    return e;
  }
};
