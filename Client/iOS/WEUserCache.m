//
//  WEUserCollection.m
//  weever
//
//  Created by Ilia Ridge on 4/7/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import "WEUserCache.h"
#import "AppDelegate.h"

@implementation WEUserCache

-(id) init {
    
    self = [super init];
    
    if (self) {
        self.userArray = [[NSMutableDictionary alloc] init];
    }
    
    return self;
    
}

-(void) userForId:(id)userId withCompletionBlock:(void (^)(id))completionBlock {
    
    if (!userId)
        return;
    
    WEUser* user;
    
    if (userId)
        user = (WEUser*)[self.userArray objectForKey:userId];
    
    if (!user) {
        NSLog (@"User Not CACHED %@" , userId);
        user = [WEUser alloc];
        [user initWithId:userId withCompletionBlock:^(id result){
            [self.userArray setObject:result forKey:userId];
            completionBlock(result);
        }];
        
    } else {
        NSLog (@"User FROM CACHE %@" , user);
        user.isFromCache = YES;
        completionBlock(user);
    }
    
}


-(WEUser*)userForId:(id)userId {

    NSLog (@"Usercount  %i" , [self.userArray count]);
    
    WEUser* user = (WEUser*)[self.userArray objectForKey:userId];
    
    NSLog (@"User found now %@" , user);
    
    return user;
    
}

+(WEUser*)currentUser {

    return [(AppDelegate*)[[UIApplication sharedApplication] delegate] currentUser];

}

@end
