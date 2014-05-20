//
//  WEPost.m
//  weever
//
//  Created by Ilia Ridge on 3/28/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import "WEPost.h"

/* 
 
 ownerId: { type: mongoose.Schema.Types.ObjectId , ref: 'users' },
 channel: { type: mongoose.Schema.Types.ObjectId , ref: 'channels' },
 content : {},
 color : String,
 type : Number,
 pin : String,
 image : String,
 sound : String,
 timestamp : { type: Date, default: Date.now } 
 
 */

@interface WEPost ()

@property (nonatomic , copy) NSString* ownerId;
@property (nonatomic , copy) NSString* channel;
@property (nonatomic , copy) NSString* content;
@property (nonatomic , copy) NSString* color;
@property (nonatomic , copy) NSNumber* type;
@property (nonatomic , copy) NSString* pin;
@property (nonatomic , copy) NSString* image;
@property (nonatomic , copy) NSString* sound;
@property (nonatomic , copy) NSDate* timestamp;
//@property (nonatomic , copy) NSArray* loc;
//@property (nonatomic , copy) NSArray* posts;

@end

@implementation WEPost

@end
