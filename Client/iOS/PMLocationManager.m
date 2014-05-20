//
//  PaperboyLocationManager.m
//  Pinner
//
//  Created by Sam Oakley on 16/02/2013.
//  Copyright (c) 2013 Sam Oakley. All rights reserved.
//

#import "PMLocationManager.h"

@implementation PMLocationManager

- (id)init
{
    self = [super init];
    if (self != nil) {
        self.locationManager = [[CLLocationManager alloc] init];
        self.locationManager.delegate = self;
        self.locationManager.desiredAccuracy = kCLLocationAccuracyHundredMeters;
        self.locationManager.distanceFilter = 10;
    }
    return self;
}

+ (PMLocationManager*)sharedInstance
{
    static PMLocationManager *sharedLocationManagerInstance = nil;
    static dispatch_once_t predicate;
    dispatch_once(&predicate, ^{
        sharedLocationManagerInstance = [[self alloc] init];
    });
    return sharedLocationManagerInstance;
}


+ (CLLocationManager*)sharedLocationManager
{
    return [PMLocationManager sharedInstance].locationManager;
}

-(void)locationManager:(CLLocationManager *)manager didUpdateLocations:(NSArray *)locations
{
    /*
     coordinate  property
     altitude  property
     horizontalAccuracy  property
     verticalAccuracy  property
     timestamp  property
     – description
     */
    CLLocation *location = [locations lastObject];
    double timestamp = [[location timestamp] timeIntervalSince1970];
    
    CLLocationDistance distance = [self.lastLocation distanceFromLocation:location];
    
    if (self.timestamp == 0 || !self.lastLocation) {
        self.timestamp = timestamp;
        self.lastLocation = location;
    }
    else {
        if ((timestamp - self.timestamp) < 10 || distance < 100) {
            return;
        } else {

            self.timestamp = timestamp;
            self.lastLocation = location;
        }
    }
    
   [[NSNotificationCenter defaultCenter] postNotificationName:LocationChangeNotification object:self userInfo:[locations lastObject]];
    
}

-(void)locationManager:(CLLocationManager *)manager didEnterRegion:(CLRegion *)region
{
    [self locationChanged];
}

-(void)locationManager:(CLLocationManager *)manager didExitRegion:(CLRegion *)region
{
    [self locationChanged];
}

-(void)locationChanged
{
    /*
     * There is a bug in iOS that causes didEnter/didExitRegion to be called multiple
     * times for one location change (http://openradar.appspot.com/radar?id=2484401). 
     * Here, we rate limit it to prevent performing the update twice in quick succession.
     */
    
    static long timestamp;
    
    if (timestamp == 0) {
        timestamp = [[NSDate date] timeIntervalSince1970];
    } else {
        if ([[NSDate date] timeIntervalSince1970] - timestamp < 10) {
            return;
        }
    }
    
    if (self.locationChangedBlock) {
        self.locationChangedBlock();
    }
}

@end
