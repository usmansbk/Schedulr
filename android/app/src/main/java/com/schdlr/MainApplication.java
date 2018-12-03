package com.schdlr;

import android.app.Application;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;

import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;

import com.facebook.react.ReactApplication;
import com.amazonaws.RNAWSCognitoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import cl.json.RNSharePackage;
import cl.json.ShareApplication;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.imagepicker.ImagePickerPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ShareApplication, ReactApplication {
 
  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();
 
  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNAWSCognitoPackage(),
            new VectorIconsPackage(),
            new RNGestureHandlerPackage(),
            new RNGoogleSigninPackage(),
            new SplashScreenReactPackage(),
            new RNSharePackage(),
            new ReactNativePushNotificationPackage(),
            new ImagePickerPackage(),
            new RNFirebasePackage(),
            new FBSDKPackage(mCallbackManager),
            new RNFetchBlobPackage(),
            new RNFirebaseCrashlyticsPackage(),
            new RNFirebaseAnalyticsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    FacebookSdk.sdkInitialize(getApplicationContext());
    SoLoader.init(this, /* native exopackage */ false);
  }
  
  @Override
  public String getFileProviderAuthority() {
    return "com.schdlr.provider";
  }
}
