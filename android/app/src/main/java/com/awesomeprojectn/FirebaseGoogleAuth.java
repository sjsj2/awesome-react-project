package com.awesomeprojectn;

import android.accounts.Account;
import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.TextView;
import android.app.Activity;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableArray;

import com.google.android.gms.auth.api.Auth;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.auth.api.signin.GoogleSignInResult;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.SignInButton;
import com.google.android.gms.auth.GoogleAuthUtil;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.common.api.OptionalPendingResult;
import com.google.android.gms.common.api.ResultCallback;
import com.google.android.gms.common.api.Status;
import com.google.android.gms.auth.GoogleAuthException;

import java.io.IOException;
import java.util.Map;
import java.util.HashMap;

public class FirebaseGoogleAuth extends ReactContextBaseJavaModule {

  private static final String DURATION_SHORT_KEY = "SHORT";
  private static final String DURATION_LONG_KEY = "LONG";

  private GoogleApiClient mGoogleApiClient;
  private static final int RC_SIGN_IN = 9001;

  public FirebaseGoogleAuth(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "FirebaseGoogleAuth";
  }

  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    // constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
    // constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
    return constants;
  }
  // @Override
  // public void onActivityResult(int requestCode, int resultCode, Intent data) {
  //     // super.onActivityResult(requestCode, resultCode, data);
  //
  //     // Result returned from launching the Intent from GoogleSignInApi.getSignInIntent(...);
  //     if (requestCode == RC_SIGN_IN) {
  //         GoogleSignInResult result = Auth.GoogleSignInApi.getSignInResultFromIntent(data);
  //         handleSignInResult(result);
  //     }
  // }
  // @ReactMethod
  // public void signIn() {
  //   Intent signInIntent = Auth.GoogleSignInApi.getSignInIntent(mGoogleApiClient);
  //   getCurrentActivity().startActivityForResult(signInIntent, RC_SIGN_IN);
  // }

  // @ReactMethod
  // public void show(String message, int duration) {
  //   // Toast.makeText(getReactApplicationContext(),message,duration).show();
  // }
  @ReactMethod
  public void getAccessToken(ReadableMap user, Promise promise) {
      Account acct = new Account(user.getString("email"), "com.google");
      try {
          String token = GoogleAuthUtil.getToken(getReactApplicationContext(), acct, scopesToString(user.getArray("scopes")));
          promise.resolve(token);
      } catch (IOException e) {
          promise.reject(e);
          e.printStackTrace();
      } catch (GoogleAuthException e) {
          promise.reject(e);
          e.printStackTrace();
      }
  }
  private  String  scopesToString(ReadableArray scopes) {
      String temp ="oauth2:";
      for (int i = 0; i < scopes.size(); i++) {
          temp += scopes.getString(i)+" ";
      }
      return temp.trim();
  }
  // @ReactMethod
  // public void setConfigure(String webClientId) {
  //    // [START configure_signin]
  //   GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
  //       .requestIdToken(webClientId)
  //       .requestEmail()
  //       .build();
  //    // [START build_client]
  //    final Activity activity = getCurrentActivity();
  //   Log.i("test","activity");
  //    mGoogleApiClient = new GoogleApiClient.Builder(activity.getBaseContext())
  //       //  .enableAutoManage(this /* FragmentActivity */, this /* OnConnectionFailedListener */)
  //        .addApi(Auth.GOOGLE_SIGN_IN_API, gso)
  //        .build();
  //
  // } 

  // private void handleSignInResult(GoogleSignInResult result) {
  //   WritableMap params = Arguments.createMap();
  //   Log.d("test", "handleSignInResult:" + result.isSuccess());
  //   if (result.isSuccess()) {
  //       // Signed in successfully, show authenticated UI.
  //     GoogleSignInAccount acct = result.getSignInAccount();
  //     params.putString("email", acct.getEmail());
  //     getReactApplicationContext()
  //      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
  //      .emit("GoogleSignInSuccess" , params);
  //   } else {
  //       // Signed out, show unauthenticated UI.
  //   }
  // }
}