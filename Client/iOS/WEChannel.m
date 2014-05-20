//
//  WEChannel.m
//  weever
//
//  Created by Ilia Ridge on 3/28/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import "WEChannel.h"
/*
 
 ownerId: { type: mongoose.Schema.Types.ObjectId , ref: 'users' }, // owner id for now
 name: String,
 content : String,
 color : String,
 image : String,
 sound : String,
 pin : String,
 loc: [],
 type: Number,
 radius: Number,
 subscribers: [{ type: mongoose.Schema.Types.ObjectId , ref: 'users' }],
 posts : [{ type: mongoose.Schema.Types.ObjectId , ref: 'channelPosts' }],
 timestamp : { type: Date, default: Date.now },
 ttl : Date
 
 */
@interface WEChannel ()

@property (nonatomic , copy) NSString* ownerId;
@property (nonatomic , copy) NSString* name;
@property (nonatomic , copy) NSString* content;
@property (nonatomic , copy) NSString* color;
@property (nonatomic , copy) NSString* image;
@property (nonatomic , copy) NSString* sound;
@property (nonatomic , copy) NSString* pin;

@property (nonatomic , copy) NSArray* loc;
@property (nonatomic , copy) NSNumber* type;
@property (nonatomic , copy) NSNumber* radius;
@property (nonatomic , copy) NSArray* subscribers;
@property (nonatomic , copy) NSArray* posts;
@property (nonatomic , copy) NSDate* timestamp;
@property (nonatomic , copy) NSDate* ttl;

@end

@implementation WEChannel

@end
