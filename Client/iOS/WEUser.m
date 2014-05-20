//
//  WEUser.m
//  weever
//
//  Created by Ilia Ridge on 3/28/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import "WEUser.h"
#import "PMConstants.h"
#import "AppDelegate.h"
#import "WEUserCache.h"

/*
 
 name: String,
 deviceId : String,
 pushId : String,
 avatar : String,
 autojoin : Boolean,
 email : String,
 subscriptions : [{ type: mongoose.Schema.Types.ObjectId , ref: 'channels' }],
 timestamp : { type: Date, default: Date.now },
 loc: []
 
 */

@interface WEUser ()

@end


@implementation WEUser

-(WEUser*) init {
    
    self = [super init];
    
    self.device = [(AppDelegate*)[[UIApplication sharedApplication] delegate] getUUID] ;
    
    return self;
}

-(BOOL)boolForKey:(id)key {
    
    BOOL result = NO;
    
    for (int i = 0; i < [self.settingsElements count]; i++) {
        for ( int j = 0; j < [[[self.settingsElements objectAtIndex:i] objectForKey:@"items"] count] ; j++) {
            id item = [[[self.settingsElements objectAtIndex:i] objectForKey:@"items"] objectAtIndex:j];
            //NSLog(@"CHAT IS ALLOWED ITEM %@" , item);
            if ([[item objectAtIndex:0] isEqualToString:key]) {
                result = [[item objectAtIndex:1] boolValue];
                NSLog(@"CHAT IS ALLOWED");
                return result;
            }
        }
    }
    
    return result;
    
}

-(void)setDelegate:(id<AsyncImageDownloadDelegate>)value {

    _delegate = value;
    
    if (self.isFromCache) {
        [_delegate downloadDidComplete:self];
    }
    
}

-(WEUser*) initWithId:(id)userId {
    
    if (self = [super init]) {
        
        self._id = userId;

        self.device = [(AppDelegate*)[[UIApplication sharedApplication] delegate] getUUID] ;

        if (!self._id) {
        
            self.avatarImage = [UIImage imageNamed:@"placeholder.jpg"];
            self.coverImage = [UIImage imageNamed:@"wine-cork.jpg"];
            
            self.settingsElements = [@[@{@"title" : @"Preferences",
                                         @"items" : @[@[@"Autojoin" , @"1" ,@"Switch"],
                                                      @[@"Incognito" , @"1",@"Switch"],
                                                      @[@"Allow Chat" , @"1",@"Switch"],
                                                      @[@"Notifications" , @"1" ,@"Segment" , @[@"Y",@"N",@"M"]],
                                                      ]},
                                       @{@"title" : @"My Information",
                                         @"items" : @[@[@"Meet-Up" , @"0",@"Switch"],
                                                      @[@"Facebook" , @"0",@"Switch"],
                                                      @[@"Linked-in" , @"0",@"Switch"]
                                                      ]}
                                       ] mutableCopy];
            
            
        } else {
            [self load];
        }
    };
    
    return self;
    
}

-(void) initWithId:(id)userId withCompletionBlock:(void (^)(id))completionBlock {
    
    self._id = userId;
    
    AppDelegate* d = (AppDelegate*)[[UIApplication sharedApplication] delegate];
    
    WEUser* u = [[d userCache] userForId:userId];
    
    if (u) {
        NSLog(@"Got self from Cache!!! Yay!!");
        completionBlock (u);
    }
    else {
        
        [self load:self withCompletionBlock:^(id result){
            completionBlock (result);
        }];
    }
    
}

-(void) save: (void (^)(id))completionBlock {
    
    NSLog (@" parameters %@" , @"saving");
    AppDelegate* d = (AppDelegate*)[[UIApplication sharedApplication] delegate];
    
    WEUser* user = self;
    
    AFHTTPRequestOperationManager *manager = [AFHTTPRequestOperationManager manager];
    
    NSData *imageData; NSString* imageName = @"";
    imageName = [[PMCommunicator shuffledAlphabet] stringByAppendingString:@"-photo.jpg"];
    imageData = UIImageJPEGRepresentation(user.avatarImage , 0.6);
    
    NSData *coverImageData; NSString* coverImageName = @"";
    coverImageName = [[PMCommunicator shuffledAlphabet] stringByAppendingString:@"-photo.jpg"];
    coverImageData = UIImageJPEGRepresentation(user.coverImage , 0.6);
    
    NSString *jsonString; NSData *jsonData;  NSError *writeError;
    
    if (user.settingsElements) {
       writeError = nil;
       jsonData = [NSJSONSerialization dataWithJSONObject:user.settingsElements options:NSJSONWritingPrettyPrinted error:&writeError];
       jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
    }
    
    
    NSDictionary *parameters = @{@"_id"      : user._id ? user._id : @"",
                                 @"ownerId" : user.ownerId ? user.ownerId : @"",
                                 @"firstName"    : user.firstName ? user.firstName : @"" ,
                                 @"lastName" : user.lastName ? user.lastName : @"",
                                 @"title"   : user.title ? user.title : @"",
                                 @"bio"     : user.bio ? user.bio : @"",
                                 @"device" : user.device ? user.device : @"" ,
                                 @"pushId" : user.pushId ? user.pushId : @"" ,
                                 @"email" : user.email ? user.email : @"",
                                 @"avatar"   : imageName,
                                 @"cover"    : coverImageName,
                                 @"loc"     : @[[NSNumber numberWithDouble:[d lastLocation].coordinate.longitude] , [NSNumber numberWithDouble: [d lastLocation].coordinate.latitude]],
                                 @"settings" : jsonString ? jsonString : @""
                                 };
    
    NSLog (@" parameters %@" , parameters);
    
    
    
    NSData *objectData = [NSJSONSerialization dataWithJSONObject:parameters options:NSJSONWritingPrettyPrinted error:&writeError];
    
    NSURL *URL = [NSURL URLWithString:[baseUrl stringByAppendingString:@"/users/update"]];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:URL];
    request.HTTPMethod = @"POST";
    [request addValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
    [request addValue:@"application/json" forHTTPHeaderField:@"Accept"];
    request.HTTPBody = objectData;//[objectString dataUsingEncoding:NSUTF8StringEncoding];

    NSURLSessionConfiguration *sessionConfiguration = [NSURLSessionConfiguration defaultSessionConfiguration];
    sessionConfiguration.HTTPAdditionalHeaders = @{ @"api-key" : @"1234567890" };
    
    
    NSURLSession *session = [NSURLSession sessionWithConfiguration:sessionConfiguration];
    NSURLSessionTask *task = [session dataTaskWithRequest:request completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
        
        NSError *writeError = nil;
        NSDictionary* result = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:&writeError];
        self._id = [result objectForKey:@"_id"];
        NSLog (@"Save all the goodness %@" , self._id);
        
        dispatch_async(dispatch_get_main_queue(), ^ {
            completionBlock (@"success");
        });
        
    }];
    
    [task resume];
    
//    NSURL *uURL = [NSURL URLWithString:[baseUrl stringByAppendingString:@"/upload"]];
//    NSMutableURLRequest *urequest = [NSMutableURLRequest requestWithURL:uURL];
//    [urequest setHTTPMethod:@"POST"];
//    [urequest addValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
//    [urequest addValue:@"application/json" forHTTPHeaderField:@"Accept"];
//    
//    NSString *boundary = [self boundaryString];
//    [urequest addValue:[NSString stringWithFormat:@"multipart/form-data; boundary=%@", boundary] forHTTPHeaderField:@"Content-Disposition"];
//
//    
//    NSURLSessionConfiguration *uconfiguration = [NSURLSessionConfiguration defaultSessionConfiguration];
//    NSURLSession *usession = [NSURLSession sessionWithConfiguration:uconfiguration];
//    
//    NSData *udata = [self createBodyWithBoundary:boundary username:@"---" password:@"---" data:imageData filename:imageName];
//    
//    NSURLSessionUploadTask *utask = [usession uploadTaskWithRequest:request fromData:udata completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
//        NSAssert(!error, @"%s: uploadTaskWithRequest error: %@", __FUNCTION__, error);
//        
//        NSLog (@"Save all the IMAGES %@" , [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding]);
//        // parse and interpret the response `NSData` however is appropriate for your app
//    }];
//    [utask resume];
//    
//    
    
    if (imageData) {
        
        AFHTTPRequestOperation *op = [manager POST:[baseUrl stringByAppendingString:@"/upload"] parameters:nil constructingBodyWithBlock:^(id<AFMultipartFormData> formData) {
            //do not put image inside parameters dictionary as I did, but append it!
            [formData appendPartWithFileData:imageData name:@"image" fileName:imageName mimeType:@"image/jpeg"];
            
        } success:^(AFHTTPRequestOperation *operation, id responseObject) {
            //NSLog(@"Image UPLOAD: %@ ***** %@", operation.responseString, responseObject);
        } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
            //NSLog(@"Error: %@ ***** %@", operation.responseString, error);
            self._id = nil;
            //completionBlock (nil);

        }];
        
        [op start];
    }
    
    if (coverImageData) {
        
        AFHTTPRequestOperation *op = [manager POST:[baseUrl stringByAppendingString:@"/upload"] parameters:nil constructingBodyWithBlock:^(id<AFMultipartFormData> formData) {
            [formData appendPartWithFileData:coverImageData name:@"image" fileName:coverImageName mimeType:@"image/jpeg"];
        } success:^(AFHTTPRequestOperation *operation, id responseObject) {
            //NSLog(@"Image UPLOAD: %@ ***** %@", operation.responseString, responseObject);
        } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
            //NSLog(@"Error: %@ ***** %@", operation.responseString, error);
            self._id = nil;
            
        }];
        
        [op start];
    }

}

-(void) load:(WEUser*)user withCompletionBlock:(void (^)(id))completionBlock {
    
    NSLog (@"In load user");
    
    AFHTTPRequestOperationManager *manager = [AFHTTPRequestOperationManager manager];
    
    NSDictionary *parameters = @{@"_id"      : user._id ? user._id : @""  ,
                                 @"device" : user.device ? user.device : @"" ,
                                 @"pushId" : user.pushId ? user.pushId : @"" ,
                                 };
    
    //NSLog(@"channel params: %@" , parameters);
    
    [manager  POST:[baseUrl stringByAppendingString:@"/users/find"] parameters:parameters
           success:^(AFHTTPRequestOperation *operation, id responseObject) {
               
               NSLog(@"Channel Complete Success: %@ ***** %@", operation.responseString, responseObject);
               
               NSDictionary* info = responseObject;
               
               self._id = [info objectForKey:@"_id"];
               self.other_ids = [info objectForKey:@"other_ids"];
               self.firstName = [info objectForKey:@"firstName"];
               self.lastName = [info objectForKey:@"lastName"];
               self.title = [info objectForKey:@"title"];
               self.bio = [info objectForKey:@"bio"];
               self.device = [info objectForKey:@"device"];
               self.pushId = [info objectForKey:@"pushId"];
               self.email = [info objectForKey:@"email"];
               self.avatar = [info objectForKey:@"avatar"];
               self.cover = [info objectForKey:@"cover"];
               
               if ([info objectForKey:@"settings"]) {
                   NSError *writeError = nil;
                   NSString* jsonString = [NSString stringWithString:[info objectForKey:@"settings"]];
                   NSData *jsonData = [jsonString dataUsingEncoding:NSUTF8StringEncoding];

                   NSArray* setting = [NSJSONSerialization JSONObjectWithData:jsonData options:NSJSONReadingMutableContainers error:&writeError];
                   
                   self.settingsElements = [setting mutableCopy];
               }
               
               
               NSDateFormatter * formatter1 = [[NSDateFormatter alloc] init];
               [formatter1 setTimeZone:[NSTimeZone timeZoneForSecondsFromGMT:0]];
               [formatter1 setLocale:[NSLocale localeWithLocaleIdentifier:@"en_US_POSIX"]];
               [formatter1 setDateFormat:@"yyyy-MM-dd'T'HH:mm:ss.SSS'Z"];
               
               NSDate * createDate = [formatter1 dateFromString:(NSString*)[info objectForKey:@"timestamp"]];
               NSString *createRelativeDate = [[SORelativeDateTransformer registeredTransformer] transformedValue:createDate];
               
               NSDate * activeDate = [formatter1 dateFromString:(NSString*)[info objectForKey:@"active"]];
               NSString *activeRelativeDate = [[SORelativeDateTransformer registeredTransformer] transformedValue:activeDate];
               
               
               self.formattedCreateDate = createRelativeDate;
               self.formattedActiveDate = activeRelativeDate;
               
               id d = (AppDelegate*)[[UIApplication sharedApplication] delegate];
               
               NSString *imageUrlString = [[NSString alloc]initWithFormat:[baseUrl stringByAppendingString:@"/upload/%@"], self.cover];;
               
               [[d imageCache] getImage:imageUrlString withCompletionBlock:^(id result){
                   [self setCoverImage:result];
                   
               }];
               
               imageUrlString = [[NSString alloc]initWithFormat:[baseUrl stringByAppendingString:@"/upload/%@"], self.avatar];;
               
               [[d imageCache] getImage:imageUrlString withCompletionBlock:^(id result){
                   //NSLog(@"PMCache result is %@" , result);
                   
                   [self setAvatarImage:result];
                   [self.delegate downloadDidComplete:self];
                   completionBlock(self);
                   
                   
               }];
               
           } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
               NSLog(@"Error: %@", error);
               completionBlock(nil);
           }];


}

-(void) load {
    
    [self load:self withCompletionBlock:^(id result){
        //completionBlock (result);
    }];

        //[[NSNotificationCenter defaultCenter] postNotificationName:StartLoadUserNotification object:self userInfo:[NSDictionary dictionaryWithObject:self forKey:@"user"]];
    
}

-(NSString*)boundaryString {
    return @"BOUNDARY_STRING";
}
- (NSData *) createBodyWithBoundary:(NSString *)boundary username:(NSString*)username password:(NSString*)password data:(NSData*)data filename:(NSString *)filename
{
    NSMutableData *body = [NSMutableData data];
    
    if (data) {
        //only send these methods when transferring data as well as username and password
        [body appendData:[[NSString stringWithFormat:@"\r\n--%@\r\n", boundary] dataUsingEncoding:NSUTF8StringEncoding]];
        [body appendData:[[NSString stringWithFormat:@"Content-Disposition: form-data; name=\"file\"; filename=\"%@\"\r\n", filename] dataUsingEncoding:NSUTF8StringEncoding]];
        [body appendData:[[NSString stringWithFormat:@"Content-Type: %@\r\n\r\n", [self mimeTypeForPath:filename]] dataUsingEncoding:NSUTF8StringEncoding]];
        [body appendData:data];
    }

    [body appendData:[[NSString stringWithFormat:@"\r\n--%@\r\n", boundary] dataUsingEncoding:NSUTF8StringEncoding]];
    [body appendData:[[NSString stringWithFormat:@"Content-Disposition: form-data; name=\"name\"\r\n\r\n%@", @"image"] dataUsingEncoding:NSUTF8StringEncoding]];

    [body appendData:[[NSString stringWithFormat:@"\r\n--%@\r\n", boundary] dataUsingEncoding:NSUTF8StringEncoding]];
    [body appendData:[[NSString stringWithFormat:@"Content-Disposition: form-data; name=\"username\"\r\n\r\n%@", username] dataUsingEncoding:NSUTF8StringEncoding]];
    
    [body appendData:[[NSString stringWithFormat:@"\r\n--%@\r\n", boundary] dataUsingEncoding:NSUTF8StringEncoding]];
    [body appendData:[[NSString stringWithFormat:@"Content-Disposition: form-data; name=\"password\"\r\n\r\n%@", password] dataUsingEncoding:NSUTF8StringEncoding]];
    
    [body appendData:[[NSString stringWithFormat:@"\r\n--%@\r\n", boundary] dataUsingEncoding:NSUTF8StringEncoding]];
    
    return body;
}

- (NSString *)mimeTypeForPath:(NSString *)path
{
    // get a mime type for an extension using MobileCoreServices.framework
    
    CFStringRef extension = (__bridge CFStringRef)[path pathExtension];
    CFStringRef UTI = UTTypeCreatePreferredIdentifierForTag(kUTTagClassFilenameExtension, extension, NULL);
    assert(UTI != NULL);
    
    NSString *mimetype = CFBridgingRelease(UTTypeCopyPreferredTagWithClass(UTI, kUTTagClassMIMEType));
    assert(mimetype != NULL);
    
    CFRelease(UTI);
    
    return mimetype;
}

@end
