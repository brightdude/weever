//
//  WEUserCollection.h
//  weever
//
//  Created by Ilia Ridge on 4/7/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "WEUser.h"

@interface WEUserCache : NSObject

@property (nonatomic , strong) NSMutableDictionary* userArray;

+(WEUser*)currentUser;
-(WEUser*)userForId:(id)userId;
-(void) userForId:(id)userId withCompletionBlock:(void (^)(id))completionBlock;


@end
