//
//  StoryboardInfo.h
//  ADVFlatUI
//
//  Created by Tope on 06/06/2013.
//  Copyright (c) 2013 App Design Vault. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface StoryboardInfo : NSObject

@property (nonatomic, strong) NSString* name;

@property (nonatomic, strong) NSString* storyboardId;

@property (nonatomic, strong) NSArray* controllers;

-(id)initWithName:(NSString*)name andStoryboardId:(NSString*)storyboardId;

@end
