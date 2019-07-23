package com.schdlr;

import android.app.Application;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;

import com.facebook.react.ReactApplication;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.thebylito.navigationbarcolor.NavigationBarColorPackage;
import com.devfd.RNGeocoder.RNGeocoderPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;









import com.amazonaws.RNAWSCognitoPackage;








import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
 
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
            new RNGoogleSigninPackage(),
            new RNFusedLocationPackage(),
            new VectorIconsPackage(),
            new SplashScreenReactPackage(),
            new ReactNativePushNotificationPackage(),
            new NavigationBarColorPackage(),
            new RNGeocoderPackage(),
            new FBSDKPackage(),
            new RNAWSCognitoPackage()
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
  
}
