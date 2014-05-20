//
//  WEActivityFactory.h
//  weever
//
//  Created by Ilia Ridge on 4/18/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "WECustomActivity.h"

@interface WEActivityFactory : NSObject

+(WECustomActivity*)dropBoxActivity     :(performBlock)completionBlock;
+(WECustomActivity*)imagePickerActivity :(performBlock)completionBlock;
+(WECustomActivity*)voiceRecorderActivity :(performBlock)completionBlock;
+(WECustomActivity*)photoCameraActivity :(performBlock)completionBlock;


+(id)activityController:(NSArray*)items;

@end
