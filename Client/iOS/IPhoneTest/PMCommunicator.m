//
//  CCCommunicator.m
//  IPhoneTest
//
//  Created by Ilia Ridge on 3/12/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import "PMCommunicator.h"
#import "WEUser.h"
#import "AppDelegate.h"


@implementation PMCommunicator

+ (NSString *)shuffledAlphabet
{
    const NSUInteger length = 'Z' - 'A' + 1;
    unichar alphabet[length];
    alphabet[0] = 'A';
    
    for ( NSUInteger i = 1; i < length; i++ )
    {
        NSUInteger j = arc4random_uniform((uint32_t)i + 1);
        alphabet[i] = alphabet[j];
        alphabet[j] = 'A' + i;
    }
    
    return [NSString stringWithCharacters:alphabet length:length];
}


-(void) startListen {
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(startCreateChannel:)
                                                 name:StartCreateChannelNotification
                                               object:nil];
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(startUpdate:)
                                                 name:StartUpdateNotification
                                               object:nil];
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(startPostMessage:)
                                                 name:StartPostMessageNotification
                                               object:nil];
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(startPostUser:)
                                                 name:StartPostUserNotification
                                               object:nil];
    

    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(startSubscribeChannel:)
                                                 name:StartSubscribeChannelNotification
                                               object:nil];

    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(startLoadUser:)
                                                 name:StartLoadUserNotification
                                               object:nil];

    
    
    
}

-(void) startCreateChannel:(NSNotification*)notification {

    id params = [notification userInfo];
    
    if (!self.isUpdating) {
        
        self.isUpdating = YES;
        
        AppDelegate* d = (AppDelegate*)[[UIApplication sharedApplication] delegate];
        
        WEUser* user = [d currentUser];
        
        AFHTTPRequestOperationManager *manager = [AFHTTPRequestOperationManager manager];
        //manager.requestSerializer = [AFJSONRequestSerializer serializer];
        //manager.responseSerializer = [AFJSONResponseSerializer serializer];
        
        NSData *soundData; NSString* soundName = @"";
        if (![[params objectForKey:@"recording"] isEqualToString:@""])
        {
            soundName = [[PMCommunicator shuffledAlphabet] stringByAppendingString:@"-recording.caf"];
            soundData = [NSData dataWithContentsOfFile:[params objectForKey:@"recording"]];
        }
        
        NSData *imageData; NSString* imageName = @"";
        if (((UIImage*)[params objectForKey:@"image"]).size.height > 2)
        {
            imageName = [[PMCommunicator shuffledAlphabet] stringByAppendingString:@"-photo.jpg"];
            imageData = UIImageJPEGRepresentation([params objectForKey:@"image"], 0.7);
        }
        
//        NSLog(@"channel update params: %@" , params);
        


        NSDictionary *parameters = @{@"ownerId" : user._id ,
                                     @"name"    : [NSString stringWithFormat:@"%@ %@" , user.firstName , user.lastName] ,
                                     @"content" : [NSString stringWithFormat:@"%@" , [params objectForKey:@"message"]],
                                     @"color"   : [NSString stringWithFormat:@"%@" , [params objectForKey:@"color"]],
                                     @"type"    : [params objectForKey:@"type"],
                                     @"pin"     : [params objectForKey:@"pin"],
                                     @"image"   : imageName,
                                     @"sound"   : soundName,
                                     @"fileUrl" : [params objectForKey:@"fileUrl"],
                                     @"loc"     : @[[NSNumber numberWithDouble:[d lastLocation].coordinate.longitude] , [NSNumber numberWithDouble: [d lastLocation].coordinate.latitude]] };
        
        //NSLog(@"channel params: %@" , parameters);
        
        [manager  POST:[baseUrl stringByAppendingString:@"/channels/create"] parameters:parameters
              success:^(AFHTTPRequestOperation *operation, id responseObject) {
                  
                  self.isUpdating = NO;
                  NSLog(@"Channel Complete Success: %@ ***** %@", operation.responseString, responseObject);
                  [[NSNotificationCenter defaultCenter] postNotificationName:CompleteCreateChannelNotification object:self userInfo:responseObject];
                  
                  
              } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
                  self.isUpdating = NO;
                  NSLog(@"Error: %@", error);
              }];


        if (soundData) {
            
            AFHTTPRequestOperation *op = [manager POST:[baseUrl stringByAppendingString:@"/upload"] parameters:nil constructingBodyWithBlock:^(id<AFMultipartFormData> formData) {
                //do not put image inside parameters dictionary as I did, but append it!
                [formData appendPartWithFileData:soundData name:@"image" fileName:soundName mimeType:@"audio/caf"];
                
            } success:^(AFHTTPRequestOperation *operation, id responseObject) {
                NSLog(@"Sound UPLOAD: %@ ***** %@", operation.responseString, responseObject);
                
            } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
                NSLog(@"Error: %@ ***** %@", operation.responseString, error);
                
            }];
            
            [op start];
        }
        

        if (imageData) {

                AFHTTPRequestOperation *op = [manager POST:[baseUrl stringByAppendingString:@"/upload"] parameters:nil constructingBodyWithBlock:^(id<AFMultipartFormData> formData) {
                    //do not put image inside parameters dictionary as I did, but append it!
                [formData appendPartWithFileData:imageData name:@"image" fileName:imageName mimeType:@"image/jpeg"];

                } success:^(AFHTTPRequestOperation *operation, id responseObject) {
                    NSLog(@"Image UPLOAD: %@ ***** %@", operation.responseString, responseObject);

                } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
                    NSLog(@"Error: %@ ***** %@", operation.responseString, error);
                    
                }];
                
                [op start];
        }
        
    }

}

-(void) startUpdate:(id)params {
    
    NSLog (@"In start update");
    AppDelegate* d = (AppDelegate*)[[UIApplication sharedApplication] delegate];
    
    if (![d currentUser] || ![d currentUser]._id)
        return;
    
    if (!self.isUpdating) {
        
        self.isUpdating = YES;

        
        AFHTTPRequestOperationManager *manager = [AFHTTPRequestOperationManager manager];
        
        NSDictionary *parameters = @{@"_id" : [d currentUser]._id,
                                     @"name": [d getUUID] ,
                                     @"loc" :  @[[NSNumber numberWithDouble:[d lastLocation].coordinate.longitude] , [NSNumber numberWithDouble: [d lastLocation].coordinate.latitude]] };
        
        //NSLog(@"update params: %@ - url %@" , parameters , [baseUrl stringByAppendingString:@"/channels/findNear"]);
        
        [manager POST:[baseUrl stringByAppendingString:@"/channels/findNear"] parameters:parameters
              success:^(AFHTTPRequestOperation *operation, id responseObject) {

                self.isUpdating = NO;
                 //NSLog(@"Success: ***** %@", responseObject);
                [[NSNotificationCenter defaultCenter] postNotificationName:CompleteUpdateNotification object:self userInfo:responseObject];
            
            
        } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
            self.isUpdating = NO;
            NSLog(@"Error: %@", error);
        }];
    }
    
}

-(void) startPostMessage:(NSNotification*)notification {
    
    

    
    id params = [notification userInfo];
    
    if (!self.isUpdating) {
        
        self.isUpdating = YES;
        
        AppDelegate* d = (AppDelegate*)[[UIApplication sharedApplication] delegate];
        
        AFHTTPRequestOperationManager *manager = [AFHTTPRequestOperationManager manager];
        
        WEUser* user = [d currentUser];
        
        NSData *soundData; NSString* soundName = @"";
        if (![[params objectForKey:@"recording"] isEqualToString:@""])
        {
            soundName = [[PMCommunicator shuffledAlphabet] stringByAppendingString:@"-recording.caf"];
            soundData = [NSData dataWithContentsOfFile:[params objectForKey:@"recording"]];
        }
        
        NSData *imageData; NSString* imageName = @"";
        if (((UIImage*)[params objectForKey:@"image"]).size.height > 2)
        {
            imageName = [[PMCommunicator shuffledAlphabet] stringByAppendingString:@"-photo.jpg"];
            imageData = UIImageJPEGRepresentation([params objectForKey:@"image"], 0.7);
        }
        
        
        
        NSDictionary *parameters = @{@"ownerId" : user._id ,
                                     @"content" : [params objectForKey:@"message"],
                                     @"color"   : [params objectForKey:@"color"],
                                     @"type"    : [params objectForKey:@"type"],
                                     @"pin"     : [params objectForKey:@"pin"],
                                     @"image"   : imageName,
                                     @"sound"   : soundName,
                                     @"fileUrl" : [params objectForKey:@"fileUrl"],
                                     @"channel" : [params objectForKey:@"channel"]
                                     };
        
        NSLog(@"channel params: %@" , parameters);
        
        // NSLog(@"channel update params: %@" , params);
        
        [manager POST:[baseUrl stringByAppendingString:@"/channels/post"] parameters:parameters
              success:^(AFHTTPRequestOperation *operation, id responseObject) {
                  
                  self.isUpdating = NO;
                  NSLog(@"Channel Complete Success: %@ ***** %@", operation.responseString, responseObject);
                  [[NSNotificationCenter defaultCenter] postNotificationName:CompletePostMessageNotification object:self userInfo:responseObject];
                  
                  
              } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
                  self.isUpdating = NO;
                  NSLog(@"Error: %@", error);
              }];
        
        
        if (soundData) {
            
            AFHTTPRequestOperation *op = [manager POST:[baseUrl stringByAppendingString:@"/upload"] parameters:nil constructingBodyWithBlock:^(id<AFMultipartFormData> formData) {
                //do not put image inside parameters dictionary as I did, but append it!
                [formData appendPartWithFileData:soundData name:@"image" fileName:soundName mimeType:@"audio/caf"];
                
            } success:^(AFHTTPRequestOperation *operation, id responseObject) {
                NSLog(@"Sound UPLOAD: %@ ***** %@", operation.responseString, responseObject);
                
            } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
                NSLog(@"Error: %@ ***** %@", operation.responseString, error);
                
            }];
            
            [op start];
        }
        
        
        if (imageData) {
            
            AFHTTPRequestOperation *op = [manager POST:[baseUrl stringByAppendingString:@"/upload"] parameters:nil constructingBodyWithBlock:^(id<AFMultipartFormData> formData) {
                //do not put image inside parameters dictionary as I did, but append it!
                [formData appendPartWithFileData:imageData name:@"image" fileName:imageName mimeType:@"image/jpeg"];
                
            } success:^(AFHTTPRequestOperation *operation, id responseObject) {
                NSLog(@"Image UPLOAD: %@ ***** %@", operation.responseString, responseObject);
                
            } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
                NSLog(@"Error: %@ ***** %@", operation.responseString, error);
                
            }];
            
            [op start];
        }
        
    }
    
    
}

-(void) startSubscribeChannel:(NSNotification*)notification {
    
    id params = [notification userInfo];
    
    if (!self.isUpdating) {
        
        self.isUpdating = YES;
        
        /*
         name: String,
         content : Schema.Types.Mixed,
         channel: String,
         */
        
        
        AppDelegate* d = (AppDelegate*)[[UIApplication sharedApplication] delegate];
        
        AFHTTPRequestOperationManager *manager = [AFHTTPRequestOperationManager manager];
        
        //        NSDictionary *parameters = @{@"name": [d getUUID] ,
        //                                     @"loc" :  @[[NSNumber numberWithDouble:[d lastLocation].coordinate.longitude] , [NSNumber numberWithDouble: [d lastLocation].coordinate.latitude]] };
        
        WEUser* user = [d currentUser];

        NSString* deviceToken = user.pushId;
        
        NSString* channel = [params objectForKey:@"channel"];
        
        NSString* pin = [params objectForKey:@"pin"];

        
        if (!deviceToken)
            deviceToken = @"bf0f9bab4fbfaa825a6de9dc734a3397b5ef46f7ccab5dd2d62abba703b4ebba";

        if (!channel)
            channel = @"";

        if (!pin)
            pin = @"";
        
        
        NSDictionary *parameters = @{@"_id"      : user._id ,
                                     @"pushId"  : deviceToken,
                                     @"pin"     : pin,
                                     @"channel" : channel };
        
        NSLog(@"subscribe params: %@" , parameters);
        
        NSString* action;
        
        
        if ([params objectForKey:@"action"] == [NSNumber numberWithInt:0]) {
            action = @"subscribe";
        }
        else {
            action = @"unsubscribe";
        }
        
//        NSLog(@"action %@ - params %@" , action , parameters);
//        return;

        
        [manager POST:[[baseUrl stringByAppendingString:@"/channels/"] stringByAppendingString:action] parameters:parameters
              success:^(AFHTTPRequestOperation *operation, id responseObject) {
                  
                  self.isUpdating = NO;
                  
                  NSLog(@"Success Channel Subscribe: %@ ***** %@", operation.responseString, responseObject);
                  
                  [[NSNotificationCenter defaultCenter] postNotificationName:StartUpdateNotification object:self userInfo:responseObject];
                  
                  [[NSNotificationCenter defaultCenter] postNotificationName:CompleteSubscribeChannelNotification object:self userInfo:responseObject];

                  
              } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
                  self.isUpdating = NO;
                  NSLog(@"Error: %@", error);
              }];
        
    }
    
}

-(void) startPostUser:(NSNotification*)notification {
    
    WEUser* user = (WEUser*)[[notification userInfo] objectForKey:@"user"];
    
    AFHTTPRequestOperationManager *manager = [AFHTTPRequestOperationManager manager];
    
    NSData *imageData; NSString* imageName = @"";
    imageName = [[PMCommunicator shuffledAlphabet] stringByAppendingString:@"-photo.jpg"];
    imageData = UIImageJPEGRepresentation(user.avatarImage , 0.7);
    
    AppDelegate* d = (AppDelegate*)[[UIApplication sharedApplication] delegate];
    
    NSDictionary *parameters = @{@"_id"      : user._id ? user._id : @""  ,
                                 @"firstName"    : user.firstName ,
                                 @"lastName" : user.lastName,
                                 @"title"   : user.title,
                                 @"bio"     : user.bio,
                                 @"device" : user.device ? user.device : @"" ,
                                 @"pushId" : user.pushId ? user.pushId : @"" ,
                                 @"email" : user.email ? user.email : @"",
                                 @"avatar"   : imageName,
                                 @"loc"     : @[[NSNumber numberWithDouble:[d lastLocation].coordinate.longitude] , [NSNumber numberWithDouble: [d lastLocation].coordinate.latitude]]
                                };
    
    NSLog(@"channel params: %@" , parameters);
    
    // NSLog(@"channel update params: %@" , params);
    
    [manager  POST:[baseUrl stringByAppendingString:@"/users/update"] parameters:parameters
           success:^(AFHTTPRequestOperation *operation, id responseObject) {
               
               self.isUpdating = NO;
               NSLog(@"Channel Complete Success: %@ ***** %@", operation.responseString, responseObject);
               [[NSNotificationCenter defaultCenter] postNotificationName:CompletePostUserNotification object:self userInfo:responseObject];
               
           } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
               self.isUpdating = NO;
               NSLog(@"Error: %@", error);
           }];
    
    if (imageData) {
        
        AFHTTPRequestOperation *op = [manager POST:[baseUrl stringByAppendingString:@"/upload"] parameters:nil constructingBodyWithBlock:^(id<AFMultipartFormData> formData) {
            //do not put image inside parameters dictionary as I did, but append it!
            [formData appendPartWithFileData:imageData name:@"image" fileName:imageName mimeType:@"image/jpeg"];
            
        } success:^(AFHTTPRequestOperation *operation, id responseObject) {
            NSLog(@"Image UPLOAD: %@ ***** %@", operation.responseString, responseObject);
            
        } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
            NSLog(@"Error: %@ ***** %@", operation.responseString, error);
            
        }];
        
        [op start];
    }
    
}


@end
