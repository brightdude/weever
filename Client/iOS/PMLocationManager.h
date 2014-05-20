//
//  PaperboyLocationManager.h
//  Pinner
//
//  Created by Sam Oakley on 16/02/2013.
//  Copyright (c) 2013 Sam Oakley. All rights reserved.
//

#import <CoreLocation/CoreLocation.h>
#import "PMConstants.h"


@interface PMLocationManager : NSObject<CLLocationManagerDelegate>
@property (strong, nonatomic) CLLocationManager* locationManager;
@property (copy, nonatomic) dispatch_block_t locationChangedBlock;
@property (nonatomic) double timestamp;
@property (nonatomic, strong) CLLocation *lastLocation;

+ (CLLocationManager*) sharedLocationManager;
+ (PMLocationManager*) sharedInstance;
@end
