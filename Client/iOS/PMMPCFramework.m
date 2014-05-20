//
//  PMMPCFramework.m
//  ProxiMore
//
//  Created by Ilia Ridge on 3/20/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import "PMMPCFramework.h"
#import "UIAlertView+Additions.h"

@implementation PMMPCFramework

-(id) init {
    
    self = [super init];
    
    self.connectedPeers = [[NSMutableArray alloc] init];
    self.availablePeers = [[NSMutableArray alloc] init];
    
    return self;
}

- (void)setupPeerWithDisplayName:(NSString *)displayName {
    self.peerID = [[MCPeerID alloc] initWithDisplayName:displayName];
}

- (void)setupSession {
    if (!self.session) {
        self.session = [[MCSession alloc] initWithPeer:self.peerID];
        self.session.delegate = self;
    }
}

-(void) startBrowsingForPeers:(BOOL)browse {
    if (browse) {
        
        self.browser = [[MCNearbyServiceBrowser alloc] initWithPeer:self.peerID serviceType:@"Weever-Exchange" ];
        
        [self.browser setDelegate:self];
        [self.browser startBrowsingForPeers];
        NSLog (@"Started Browsing %@" , self.browser);
        
    } else {
        [self.browser stopBrowsingForPeers];
        self.browser = nil;
    }
}

- (void)advertiseSelf:(BOOL)advertise discoveryInfo:(id)info {
    if (advertise) {
        self.advertiser = [[MCNearbyServiceAdvertiser alloc] initWithPeer:self.peerID  discoveryInfo:[NSDictionary dictionaryWithObjectsAndKeys:info,@"user", nil] serviceType:@"Weever-Exchange"];
        [self.advertiser setDelegate:self];
        [self.advertiser startAdvertisingPeer];
        NSLog (@"Started Advertsising Self %@" , self.advertiser);
        
    } else {
        [self.advertiser stopAdvertisingPeer];
        self.advertiser = nil;
    }
}

/* SESSION DELEGATE METHODS */

- (void)session:(MCSession *)session peer:(MCPeerID *)peerID didChangeState:(MCSessionState)state {
    
    /*
     
     typedef NS_ENUM(NSInteger,
     MCSessionState) {
     MCSessionStateNotConnected,
     MCSessionStateConnecting,
     MCSessionStateConnected
     };
     
     */
    NSDictionary *userInfo = @{ @"peerID": peerID,
                                @"state" : @(state) };
    
    NSLog(@"State Changed %@" , userInfo);

    
    if (state == MCSessionStateConnected) {
       
        NSLog (@"Peer Data to send - %i " , [self.dataToSend length]);
        
        if (self.dataToSend) {
            [session sendData:self.dataToSend toPeers:[NSArray arrayWithObjects:peerID, nil] withMode:MCSessionSendDataUnreliable error:nil];
            //
        }
    }
    
    
    dispatch_async(dispatch_get_main_queue(), ^{
        [[NSNotificationCenter defaultCenter] postNotificationName:@"MPCDemo_DidChangeStateNotification"
                                                            object:nil
                                                          userInfo:userInfo];
    });
}

-(void)invitePeerToSession:(MCPeerID*)peerID withDataToSend:(NSData*)data withContext:(NSDictionary*)contextDictionary {

    if (data)
        self.dataToSend = data;

    if (YES) {
        self.session = [[MCSession alloc] initWithPeer:self.peerID];
        self.session.delegate = self;
    }
    
    NSData *contextData = [NSKeyedArchiver archivedDataWithRootObject:contextDictionary];
    NSUInteger index = [self.session.connectedPeers indexOfObjectPassingTest:^BOOL(MCPeerID* item, NSUInteger idx, BOOL *stop) {
        return [item isEqual:peerID];
    }];
    
    if (index == NSNotFound) {
        [self.browser invitePeer:peerID toSession:self.session withContext:contextData timeout:30];
        
    } else {

        [self.session sendData:self.dataToSend toPeers:[NSArray arrayWithObjects:peerID, nil] withMode:MCSessionSendDataUnreliable error:nil];
    }

}

- (void)session:(MCSession *)session didReceiveData:(NSData *)data fromPeer:(MCPeerID *)peerID {
    
//    NSLog (@"Peer Data Received - %i " , [data length]);
    
    NSString* fileName = [self.dataContext objectForKey:@"file"];

    self.preView = [[WEPreviewController alloc] initWithData:data withFile:fileName];
    [self.preView showPreview];
    
    self.session = nil;

    return;
    
//    NSDictionary *userInfo = @{ @"data": data,
//                                @"peerID": peerID };
    
   // NSLog(@"Data Received %@" , userInfo);
    
//    dispatch_async(dispatch_get_main_queue(), ^{
//        [[NSNotificationCenter defaultCenter] postNotificationName:@"MPCDemo_DidReceiveDataNotification"
//                                                            object:nil
//                                                          userInfo:userInfo];
//    });
}

- (void) session:(MCSession *)session didReceiveCertificate:(NSArray *)certificate fromPeer:(MCPeerID *)peerID certificateHandler:(void (^)(BOOL accept))certificateHandler
{
    certificateHandler(YES);
}

- (void)session:(MCSession *)session didStartReceivingResourceWithName:(NSString *)resourceName fromPeer:(MCPeerID *)peerID withProgress:(NSProgress *)progress {
    
}

- (void)session:(MCSession *)session didFinishReceivingResourceWithName:(NSString *)resourceName fromPeer:(MCPeerID *)peerID atURL:(NSURL *)localURL withError:(NSError *)error {
    
}

- (void)session:(MCSession *)session didReceiveStream:(NSInputStream *)stream withName:(NSString *)streamName fromPeer:(MCPeerID *)peerID {
    
}

/* BROWSER DELEGATE METHODS */

- (void)browser:(MCNearbyServiceBrowser *)browser didNotStartBrowsingForPeers:(NSError *)error {
    
    NSLog (@"Could not start browsing for peers");
    
}

- (void)browser:(MCNearbyServiceBrowser *)browser foundPeer:(MCPeerID *)peerID withDiscoveryInfo:(NSDictionary *)info {
    
    // browser - (void)invitePeer:(MCPeerID *)peer toSession:(MCSession *)session withContext:(NSData *)context timeout:(NSTimeInterval)timeout
    
//    if (!self.isConnected)
//        [browser invitePeer:peerID toSession:self.session withContext:nil timeout:30];
    
    //[self.availablePeers setObject:[info objectForKey:@"user"] forKey:peerID];
    
    [self.availablePeers addObject:[NSDictionary dictionaryWithObjectsAndKeys:peerID, @"peer", [info objectForKey:@"user"], @"user",  nil]];
    
    dispatch_async(dispatch_get_main_queue(), ^{
        [[NSNotificationCenter defaultCenter] postNotificationName:PeerFoundNotification object:nil];
    });

    
    NSLog (@"Found Peer %@ - session: %@ - count  %lu" , peerID , self.session, (unsigned long)[self.availablePeers count]);
    
    
    
}

- (void)browser:(MCNearbyServiceBrowser *)browser lostPeer:(MCPeerID *)peerID {
    
    NSUInteger currentIndex = 0;
    
    for (id obj in self.availablePeers) {
        //do stuff with obj
        if ([[obj objectForKey:@"peer"] isEqual:peerID]) {
            [self.availablePeers removeObjectAtIndex:currentIndex];
        }
        currentIndex++;
    }
    
    dispatch_async(dispatch_get_main_queue(), ^{
        [[NSNotificationCenter defaultCenter] postNotificationName:PeerLostNotification object:nil];
    });

    
    NSLog (@"Lost Peer %@  - count  %lu" , peerID , (unsigned long)[self.availablePeers count]);

    
}

/* ADVERTISER DELEGATE METHODS */


- (void)advertiser:(MCNearbyServiceAdvertiser *)advertiser didNotStartAdvertisingPeer:(NSError *)error {
    
    NSLog (@"Could not start advertising %@" , error);
    
}

- (void)advertiser:(MCNearbyServiceAdvertiser *)advertiser didReceiveInvitationFromPeer:(MCPeerID *)peerID withContext:(NSData *)context invitationHandler:(void (^)(BOOL accept, MCSession *session))invitationHandler {
    
    NSDictionary *myDictionary = (NSDictionary*) [NSKeyedUnarchiver unarchiveObjectWithData:context];
    
    NSString* userName = [myDictionary objectForKey:@"user"];
    NSString* fileName = [myDictionary objectForKey:@"file"];
    
    self.dataContext = myDictionary;
    
    
    UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:@"Accept a file"
                                                        message:[NSString stringWithFormat:@"%@ wants to send you %@" , userName, fileName]
                                                       delegate:self
                                              cancelButtonTitle:@"Cancel"
                                              otherButtonTitles:@"Accept", nil];
    
    [alertView showWithCompletion:^(UIAlertView *alertView, NSInteger buttonIndex) {
        if (buttonIndex == 1) {
            invitationHandler(YES , self.session);
        }
    }];
    
}

@end
