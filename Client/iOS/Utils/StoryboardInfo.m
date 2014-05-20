//
//  StoryboardInfo.m
//  ADVFlatUI
//
//  Created by Tope on 06/06/2013.
//  Copyright (c) 2013 App Design Vault. All rights reserved.
//

#import "StoryboardInfo.h"

@implementation StoryboardInfo

-(id)initWithName:(NSString*)name andStoryboardId:(NSString*)storyboardId{
    
    self = [super init];
    
    if(self){
        
        self.name = name;
        self.storyboardId = storyboardId;
    }
    
    return self;
}
@end
