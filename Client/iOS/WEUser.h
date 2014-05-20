//
//  WEUser.h
//  weever
//
//  Created by Ilia Ridge on 3/28/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "WEProtocols.h"
#import "AsyncImageView.h"


@interface WEUser : NSObject

//ownerId : { type: mongoose.Schema.Types.ObjectId , ref: 'users' },
//selectedId : { type: mongoose.Schema.Types.ObjectId , ref: 'users' },
//avatar : String,
//cover  : String,
//layout : String,
//card_name : String,
//
//firstName: String,
//lastName : String,
//title : String,
//bio 	: String,
//email : String,
//device : String,
//pushId : String,
//settings : String,
//
//subscriptions : [{ type: mongoose.Schema.Types.ObjectId , ref: 'channels' }],
//other_ids : [{ type: mongoose.Schema.Types.ObjectId , ref: 'users' }],
//active : { type: Date, default: Date.now },
//timestamp : { type: Date, default: Date.now },



@property (nonatomic , copy) NSString* _id;
@property (nonatomic , copy) NSString* ownerId;
@property (nonatomic , copy) NSString* selectedId;
@property (nonatomic , copy) NSString* layout;
@property (nonatomic , copy) NSString* card_name;

@property (nonatomic , copy) NSString* device;
@property (nonatomic , copy) NSString* pushId;

@property (nonatomic , copy) NSString* avatar;
@property (nonatomic , copy) UIImage*  avatarImage;
@property (nonatomic , copy) NSString* cover;
@property (nonatomic , copy) UIImage*  coverImage;
@property (nonatomic , copy) NSString* firstName;
@property (nonatomic , copy) NSString* lastName;
@property (nonatomic , copy) NSString* title;
@property (nonatomic , copy) NSString* bio;
@property (nonatomic , copy) NSString* autojoin;
@property (nonatomic , copy) NSString* email;
@property (nonatomic , copy) NSString* formattedCreateDate;
@property (nonatomic , copy) NSString* formattedActiveDate;

@property (nonatomic , copy) NSMutableArray* subscriptions;
@property (nonatomic , strong) NSMutableArray*  settingsElements;
@property (nonatomic , strong) NSMutableArray*  other_ids;

@property (nonatomic , strong) id<AsyncImageDownloadDelegate> delegate;
@property (nonatomic) BOOL isFromCache;

-(void) load;
-(WEUser*) initWithId:(id)userId;

-(void) save: (void (^)(id))completionBlock;
-(void) initWithId:(id)userId withCompletionBlock:(void (^)(id))result;
-(BOOL)boolForKey:(id)key;

@end

