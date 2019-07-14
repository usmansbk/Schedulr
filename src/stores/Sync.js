import { observable, action, computed } from 'mobx';
import { persist } from 'mobx-persist';

const MIN_UPPER_BOUND_TIME_MS = 2 * 1000;
const DEFAULT_UPPER_BOUND_TIME_MS = 24 * 60 * 60 * 1000;
const BUFFER_MILLISECONDS = 2000;

export default class DeltaSync {
  @persist @observable baseLastSyncTimestamp = Date.now() - DEFAULT_UPPER_BOUND_TIME_MS;
  @persist @observable lastSyncTimestamp = Date.now();
  @persist @observable baseRefreshIntervalInSeconds = null;

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
  
  @computed get lastSync () {
    return Math.floor((this.lastSyncTimestamp || baseLastSyncTimestamp) / 1000) || 0;
  }

  @action reset() {
    this.baseLastSyncTimestamp = Date.now() - DEFAULT_UPPER_BOUND_TIME_MS;
    this.lastSyncTimestamp = Date.now();
    this.baseRefreshIntervalInSeconds = null;
  }
}