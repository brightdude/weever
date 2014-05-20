//
//  AppDelegate.h
//  IPhoneTest
//
//  Created by Lovells on 13-8-20.
//  Copyright (c) 2013年 Luwei. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <CoreLocation/CoreLocation.h>
#import "PMLocationViewController.h"
#import "PMCommunicator.h"
#import "RootViewController.h"
#import "PMMPCFramework.h"
#import "PMLocationManager.h"
#import "WEUser.h"
#import "WEUserCache.h"
#import "PMImageCache.h"

@interface AppDelegate : UIResponder <UIApplicationDelegate>


@property (strong, nonatomic) UIWindow *window;
@property (strong, nonatomic) UINavigationController* navController;
@property (strong, nonatomic) UIViewController *viewController;
@property (strong, nonatomic) CLLocationManager *locationManager;
@property (strong, nonatomic) id centralCommunicator; // CCCommunicator *

@property (strong, nonatomic) NSTimer* timer;

@property (nonatomic) double timestamp;
@property (nonatomic, strong) CLLocation *lastLocation;

@property (nonatomic, strong) NSOperationQueue *imageOperationQueue;
@property (nonatomic, strong) PMImageCache *imageCache;

@property (nonatomic, strong) PMMPCFramework *mpcHandler;
@property (nonatomic, strong) WEUser* currentUser;
@property (nonatomic, strong) WEUserCache* userCache;


- (NSString*) getUUID;

@end
