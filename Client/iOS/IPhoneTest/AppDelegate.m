//
//  AppDelegate.m
//  IPhoneTest
//
//  Created by Lovells on 13-8-20.
//  Copyright (c) 2013年 Luwei. All rights reserved.
//

#import "AppDelegate.h"
#import "UIAlertView+Additions.h"
#import "WEChatController.h"
#import "WEIntroView.h"
#import <DBChooser/DBChooser.h>
#import "PMEditProfileController.h"

@implementation AppDelegate

/* FINISH BLOCK */
void (^finish)(id) = ^void(id input) {
    
    AppDelegate* self = (AppDelegate*)input;
    
    
    
    [[UIApplication sharedApplication] registerForRemoteNotificationTypes: (UIRemoteNotificationTypeBadge | UIRemoteNotificationTypeSound | UIRemoteNotificationTypeAlert)];
    
    
    
    //[[NSNotificationCenter defaultCenter] postNotificationName:StartUpdateNotification object:self];
    
    
    self.centralCommunicator = [[PMCommunicator alloc] init];
    [self.centralCommunicator startListen];
    
    
    [[NSNotificationCenter defaultCenter] postNotificationName:StartUpdateNotification object:self];
    
    self.timer = [NSTimer scheduledTimerWithTimeInterval:30.0
                                                  target:self
                                                selector:@selector(onTimeElapsed:)
                                                userInfo:nil
                                                 repeats:YES];
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(onLocationChangeComplete:)
                                                 name:LocationChangeNotification
                                               object:nil];
    
    
    
    
    self.mpcHandler = [[PMMPCFramework alloc] init];
    [self.mpcHandler setupPeerWithDisplayName:[NSString stringWithFormat:@"%@ %@" , self.currentUser.firstName, self.currentUser.lastName]];
    [self.mpcHandler setupSession];
    [self.mpcHandler advertiseSelf:YES discoveryInfo:self.currentUser._id];
    [self.mpcHandler startBrowsingForPeers:YES];
    
    [[NSNotificationCenter defaultCenter] postNotificationName:StartUpdateNotification object:self];
    
    
};

/* This will be called FIRST before didFinish - prepare and set things up */
- (BOOL)application:(UIApplication *)application willFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    
    NSLog (@"WILL FINISH LAUNCHIN");
    
    if (application.applicationState != UIApplicationStateBackground ) {
        
        self.userCache = [[WEUserCache alloc] init];
        self.imageCache = [[PMImageCache alloc] init];
        self.imageOperationQueue = [[NSOperationQueue alloc]init];
        self.imageOperationQueue.maxConcurrentOperationCount = 4;
        
        self.locationManager = [PMLocationManager sharedLocationManager];
        [self.locationManager startUpdatingLocation];
        
        [[PMLocationManager sharedInstance] setLocationChangedBlock:^{
            //Perform your background updates here.
            NSLog(@"Location change stuff");
        }];
        
        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(onLocationChange:)
                                                     name:LocationChangeNotification
                                                   object:nil];

    }
    
    return YES;
}


/* this will be caled SECOND */
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    NSLog (@"DID FINISH LAUNCHING");
    
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
//    [defaults setBool:NO forKey:@"introDismissed"];
//    [defaults synchronize];

    
    NSString* userId = [defaults valueForKey:@"userId"];
    
    if (!userId) {
        
        NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
        
        if (![defaults boolForKey:@"introDismissed"]) {
            
            WEIntroController* intro = [[WEIntroController alloc] initWithCompletionHandler:^(id result) {
                
                if ((BOOL)result) {
                    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
                    [defaults setBool:YES forKey:@"introDismissed"];
                    [defaults synchronize];
                }
                
                self.currentUser = [[WEUser alloc] initWithId:nil];
                
                self.currentUser.device = [self getUUID];
                
                
                PMEditProfileController* controller = [[PMEditProfileController alloc] initWithUser:self.currentUser completionHandler:^(id result) {
                    NSLog (@"completed saving user");
                    
                    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
                    [defaults setValue:self.currentUser._id forKey:@"userId"];
                    [defaults synchronize];
                    
                    finish (self);
                    
                    RootViewController* controller = [[RootViewController alloc] init];
                    
                    [self.navController pushViewController:controller animated:YES];
                    
                }];
                
                [self.navController pushViewController:controller animated:YES];

                // finish(result);
            }];
            
            self.viewController = intro;

        } else { // if intro was already viewed but still no user id.
            
            self.currentUser = [[WEUser alloc] initWithId:nil];
            
            PMEditProfileController* controller = [[PMEditProfileController alloc] initWithUser:self.currentUser completionHandler:^(id result) {
                NSLog (@"completed saving user");
                
                NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
                [defaults setValue:self.currentUser._id forKey:@"userId"];
                [defaults synchronize];
                
                finish (self);
                
                RootViewController* controller = [[RootViewController alloc] init];
                
                [self.navController pushViewController:controller animated:YES];
                
            }];
            
            [self.navController pushViewController:controller animated:YES];
        }

    }
    else { // if user exists let's just set up everything
        
        NSLog (@"User exists but and with user id %@" , userId);
        
        [self.userCache userForId:userId withCompletionBlock:^(id result){
            self.currentUser = (WEUser*)result;
            [self.currentUser setDelegate:self];
            
            finish (self);

        }];
    
        self.viewController = [[RootViewController alloc] init];
    }
    
    [application setStatusBarHidden:YES];
    
    self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    
    [[UIBarButtonItem appearance] setBackButtonBackgroundImage:[[UIImage imageNamed:@"left-512" tintColor:[UIColor pmMainColor] style:UIImageTintedStyleKeepingAlpha] imageScaledToSize:CGSizeMake(32, 32)]
                                                      forState:UIControlStateNormal
                                                    barMetrics:UIBarMetricsDefault];

    
    
    self.navController = [[UINavigationController alloc] initWithRootViewController:self.viewController];
    
    [self.navController.navigationBar setBackgroundImage:[UIImage new] forBarMetrics:UIBarMetricsDefault];
    self.navController.navigationBar.shadowImage = [UIImage new];
    self.navController.navigationBar.translucent = YES;
    
    self.window.rootViewController = self.navController;
    [self.window makeKeyAndVisible];
    
    UILocalNotification *notification = [launchOptions objectForKey:UIApplicationLaunchOptionsRemoteNotificationKey];
    
    if (notification)
    {
        NSLog(@"notification caused app to launch, alert body = %@", notification.alertBody);
        
        //NSString *message = [[notification valueForKey:@"aps"] valueForKey:@"alert"];
        
        NSString* notificationType = [notification valueForKey:@"type"];
        NSString* notificationFrom = [notification valueForKey:@"from"];
        
        if ([notificationType isEqualToString:@"chat"]) {
            
            
            [self.userCache userForId:notificationFrom withCompletionBlock:^(id result){

                        NSLog (@"User does exist - in Remote Notification ");
                        WEUser* user = (WEUser*)result;
                
                        NSArray* messagingUsers = [NSArray arrayWithObjects:self.currentUser, user , nil];
                        
                        WEChatController *vc = [[WEChatController alloc] init];
                        [vc setMessagingUsers:messagingUsers];
                        
                        [self.window.rootViewController presentViewController:vc animated:YES completion:nil];
                
            }];
            
        }
        
        // do what ever action you want to do
        // you could just copy the code from "didReceiveLocalNotification" and paste it here
    }
    
    return YES;
    
}

-(void) onLocationChangeComplete:(id)result {
    [[NSNotificationCenter defaultCenter] postNotificationName:StartUpdateNotification object:self];
}

- (NSString*) getUUID {
    
    NSUUID *oNSUUID = [[UIDevice currentDevice] identifierForVendor];
    NSString *strUniqueIdentifier = [oNSUUID UUIDString];
    return strUniqueIdentifier;
    
}

- (void)application:(UIApplication*)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData*)deviceToken
{
	NSLog(@"My token is: %@", deviceToken);
    
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    [defaults setValue:deviceToken forKey:@"pushToken"];
    [defaults synchronize];
    
    self.currentUser.pushId = [NSString stringWithFormat:@"%@" , deviceToken];
}

- (void)application:(UIApplication*)application didFailToRegisterForRemoteNotificationsWithError:(NSError*)error
{
	NSLog(@"Failed to get token, error: %@", error);
}


- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url sourceApplication:(NSString *)source annotation:(id)annotation
{
    NSLog (@"openURL");
    if ([[DBChooser defaultChooser] handleOpenURL:url]) {
        // This was a Chooser response and handleOpenURL automatically ran the
        // completion block
        return YES;
    }
    
    return NO;
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult result))handler {
    //fetch the latest content
    NSLog (@"notify with completion");
    
    if([application applicationState] == UIApplicationStateInactive)
    {
        //If the application state was inactive, this means the user pressed an action   button
        // from a notification.
        
        //Handle notification
        
        NSString* notificationType = [userInfo valueForKey:@"type"];
        NSString* notificationFrom = [userInfo valueForKey:@"from"];
        
        if ([notificationType isEqualToString:@"chat"]) {
            
            [self.userCache userForId:notificationFrom withCompletionBlock:^(id result){

                        WEUser* user = (WEUser*)result;
                        NSArray* messagingUsers = [NSArray arrayWithObjects:self.currentUser, user , nil];
                        WEChatController *vc = [[WEChatController alloc] init];
                        [vc setMessagingUsers:messagingUsers];
                        
                        [self.window.rootViewController presentViewController:vc animated:YES completion:nil];
            
            }];
        };
        
    } else {
        
        NSString *cancelTitle = @"Close";
        NSString *showTitle = @"Show";
        NSString *message = [[userInfo valueForKey:@"aps"] valueForKey:@"alert"];
        
        NSString* notificationType = [userInfo valueForKey:@"type"];
        NSString* notificationFrom = [userInfo valueForKey:@"from"];
        
        if ([notificationType isEqualToString:@"chat"]) {
            
            
            [self.userCache userForId:notificationFrom withCompletionBlock:^(id result){
                NSLog (@"User does exist");
                WEUser* user = (WEUser*)result;
                
                UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:[NSString stringWithFormat:@"Message from: %@ %@" , user.firstName , user.lastName ? user.lastName : @"" ]
                                                                    message:message
                                                                   delegate:self
                                                          cancelButtonTitle:cancelTitle
                                                          otherButtonTitles:showTitle, nil];
                
                [alertView showWithCompletion:^(UIAlertView *alertView, NSInteger buttonIndex) {
                    NSLog (@"Lets chat %i" , buttonIndex);
                    if (buttonIndex == 1) {
                        
                        NSArray* messagingUsers = [NSArray arrayWithObjects:self.currentUser, user , nil];
                        
                        WEChatController *vc = [[WEChatController alloc] init];
                        [vc setMessagingUsers:messagingUsers];
                        
                        [self.window.rootViewController presentViewController:vc animated:YES completion:nil];
                        
                    }
                }];
                
            }];
            
        }

    }
    
    return; // Need to investigate for data refresh ???
    if(![[userInfo objectForKey:@"content-available"] intValue])
    {
        handler(UIBackgroundFetchResultNoData);
        return;
    }
    //[_contentLoader downloadContentWithCompletionHandler:^(BOOL didReceiveNewContent){
    if(YES) // didReceiveNewContent
    {
        handler(UIBackgroundFetchResultNewData);
    }else
    {
        handler(UIBackgroundFetchResultNoData);
    }
 
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
    
    //NSLog(@"user info %@" , userInfo);
    
    NSLog (@"notify withOUT completion");

    
    UIApplicationState state = [application applicationState];
    if (state == UIApplicationStateActive) {
        
        
    } else {
        //Do stuff that you would do if the application was not active
    }
}


-(void) onTimeElapsed:(id)timer {
    NSLog (@"On Timer");

    [[NSNotificationCenter defaultCenter] postNotificationName:StartUpdateNotification object:self];
}

-(void)onLocationChange:(id)result {
    
    self.lastLocation = (CLLocation*)[result userInfo];
    self.timestamp = [[self.lastLocation timestamp] timeIntervalSince1970];
    
    //NSLog (@"App delegate did change %f, %f - " , [self.lastLocation coordinate].longitude , [self.lastLocation coordinate].latitude );
    //NSLog(@"App delegate Location changed %@" , result);
    
}


- (void)applicationWillResignActive:(UIApplication *)application
{
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
    NSLog (@"Will resign");
    
    [self.timer invalidate];
    self.timer    = nil;

     
}

- (void)applicationDidEnterBackground:(UIApplication *)application
{
    NSLog (@"DID NTER BACK");

    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
   [self.timer invalidate];
   self.timer    = nil;

}

- (void)applicationWillEnterForeground:(UIApplication *)application
{
    NSLog (@"Will enter ForeGround");
    // Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
}

- (void)applicationDidBecomeActive:(UIApplication *)application
{
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    [UIApplication sharedApplication].applicationIconBadgeNumber = 0;
    
//    self.timer = [NSTimer scheduledTimerWithTimeInterval:30.0
//                                                  target:self
//                                                selector:@selector(onTimeElapsed:)
//                                                userInfo:nil
//                                                 repeats:YES];

}

- (void)applicationWillTerminate:(UIApplication *)application
{
    NSLog (@"Will Terminate");
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
   

}

@end
