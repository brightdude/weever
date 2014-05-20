//
//  PMMPCFramework.h
//  ProxiMore
//
//  Created by Ilia Ridge on 3/20/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <MultipeerConnectivity/MultipeerConnectivity.h>
#import "PMConstants.h"
#import "WEPreviewController.h"

@interface PMMPCFramework : NSObject<MCNearbyServiceAdvertiserDelegate,
MCNearbyServiceBrowserDelegate,
MCSessionDelegate>

@property (nonatomic, strong) MCPeerID *peerID;
@property (nonatomic, strong) MCSession *session;
@property (nonatomic, strong) NSData *dataToSend;
@property (nonatomic, strong) NSDictionary* dataContext;

@property (nonatomic, strong) NSMutableArray *availablePeers;
@property (nonatomic, strong) NSMutableArray *connectedPeers;
@property (nonatomic, strong) WEPreviewController* preView;

//@property (nonatomic, strong) MCBrowserViewController *browser;
//@property (nonatomic, strong) MCAdvertiserAssistant *advertiser;

@property (nonatomic, strong) MCNearbyServiceBrowser *browser;
@property (nonatomic, strong) MCNearbyServiceAdvertiser *advertiser;
@property (nonatomic) BOOL isConnected;

- (void)setupPeerWithDisplayName:(NSString *)displayName;
- (void)setupSession;

- (void)advertiseSelf:(BOOL)advertise discoveryInfo:(id)info;
- (void) startBrowsingForPeers:(BOOL)browse;
-(void)invitePeerToSession:(MCPeerID*)peerID withDataToSend:(NSData*)data withContext:(NSDictionary*)contextDictionary;

@end
