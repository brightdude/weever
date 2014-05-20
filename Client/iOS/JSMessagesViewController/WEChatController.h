//
//  Created by Jesse Squires
//  http://www.hexedbits.com
//
//
//  Documentation
//  http://cocoadocs.org/docsets/JSMessagesViewController
//
//
//  The MIT License
//  Copyright (c) 2013 Jesse Squires
//  http://opensource.org/licenses/MIT
//

#import "JSMessagesViewController.h"
#import "WEUser.h"

@interface WEChatController : JSMessagesViewController <JSMessagesViewDataSource, JSMessagesViewDelegate>

@property (strong, nonatomic) NSMutableArray *messages;
@property (strong, nonatomic) NSMutableArray *messageList;
@property (strong, nonatomic) NSMutableDictionary *avatars;

@property (strong, nonatomic) WEUser* fromUser;
@property (strong, nonatomic) WEUser* toUser;

@property (strong, nonatomic) NSTimer* timer;


-(void) setMessagingUsers:(NSArray*)users;
-(void) loadMessages;
-(void) postMessage:(id)message;

@end
