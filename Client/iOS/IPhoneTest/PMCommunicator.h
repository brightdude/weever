//
//  CCCommunicator.h
//  IPhoneTest
//
//  Created by Ilia Ridge on 3/12/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>
#import "AFHTTPRequestOperationManager.h"
#import "PMConstants.h"
#import "AppDelegate.h"

@interface PMCommunicator : NSObject

@property (nonatomic) BOOL isUpdating;

-(void) startListen;
+ (NSString *)shuffledAlphabet;


@end
