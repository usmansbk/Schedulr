import admob, { MaxAdContentRating, InterstitialAd, TestIds, AdEventType } from '@react-native-firebase/admob';
import { observable, action } from 'mobx';
import logError from 'config/logger';

export default class AdManager {

  @action showInterstitialAd = () => {
    const interstitialAd = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['fashion']
    });
    this.unsubscribe = interstitialAd.onAdEvent((type, error) => {
      if (type === AdEventType.LOADED) {
        interstitialAd.show();
        this.unsubscribe();
      }
      if (error) {
        logError(error);
      }
    });
    interstitialAd.load();
  };

  @action reset() {
    this.unsubscribe && this.unsubscribe();
  }

}