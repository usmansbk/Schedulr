import { observable, action, computed } from 'mobx';
import { persist } from 'mobx-persist';

const MIN_UPPER_BOUND_TIME_MS = 2 * 1000;
const DEFAULT_UPPER_BOUND_TIME_MS = 24 * 60 * 60 * 1000;
const BUFFER_MILLISECONDS = 2000;

export default class DeltaSync {
  @persist @observable baseLastSyncTimestamp = Date.now();
  @persist @observable lastSyncTimestamp = Date.now();
  @persist @observable baseRefreshIntervalInSeconds = DEFAULT_UPPER_BOUND_TIME_MS;

  @action updateLastSyncTimestamp() {
    this.lastSyncTimestamp = Date.now() - BUFFER_MILLISECONDS;
  }

  @action updateBaseLastSyncTimestamp() {
    this.baseLastSyncTimestamp = Date.now() - BUFFER_MILLISECONDS;
  }

  @computed get upperBoundTimeMs() {
    const baseRefreshIntervalInSeconds = this.baseRefreshIntervalInSeconds;
    const upperbound = baseRefreshIntervalInSeconds ? baseRefreshIntervalInSeconds * 1000 : DEFAULT_UPPER_BOUND_TIME_MS;
    return Math.max(upperbound, MIN_UPPER_BOUND_TIME_MS);
  }

  @computed get skipBaseQuery() {
    return (Date.now() - this.baseLastSyncTimestamp) < this.upperBoundTimeMs;
  }

  @action reset() {
    this.baseLastSyncTimestamp = Date.now();
    this.lastSyncTimestamp = Date.now();
    this.baseRefreshIntervalInSeconds = DEFAULT_UPPER_BOUND_TIME_MS;
  }
}