//
//  PMImageCache.m
//  weever
//
//  Created by Ilia Ridge on 4/12/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import "PMImageCache.h"
#import "AFHTTPRequestOperationManager.h"
#import "PMConstants.h"

@implementation PMImageCache

-(id) init {
    
    self = [super init];
    
    self.imageOperationQueue = [[NSOperationQueue alloc] init];
    
    //self.imagecache = [[NSMutableDictionary alloc] init];
    
    NSURLCache *URLCache = [[NSURLCache alloc] initWithMemoryCapacity:32*1024*1024
                                                      diskCapacity:128*1024*1024
                                                          diskPath:@"app_cache"];
    
    // Set the shared cache to our new instance
    [NSURLCache setSharedURLCache:URLCache];
    
    return self;
    
}

-(void) getImage:(id)image withCompletionBlock:(void (^)(id))result {
    
//    if ([self.imagecache objectForKey:image]) {
//        result([self.imagecache objectForKey:image]);
//        
//        return;
//
//    }
    
    if (!image) {
        NSLog (@"No image requested");
        return;
    }
    
    NSURL *imageurl = [NSURL URLWithString:image];
    
    NSURLRequest *urlReq = [NSURLRequest requestWithURL:imageurl
                                            cachePolicy:NSURLRequestReturnCacheDataElseLoad
                                        timeoutInterval:30.0];
    
    AFHTTPRequestOperation *operation = [[AFHTTPRequestOperation alloc]initWithRequest:urlReq];
    [operation  setCompletionBlockWithSuccess:^(AFHTTPRequestOperation *operation, id responseObject) {
        
        //NSLog(@"success: %@", operation.responseString);
        UIImage *img = [UIImage imageWithData:[NSData dataWithData:responseObject]];
//        if (image)
//            [self.imagecache setObject:img forKey:image];
        
        dispatch_async(dispatch_get_main_queue(), ^{
            result(img);
        });
    }
          failure:^(AFHTTPRequestOperation *operation, NSError *error) {
              
              NSLog(@"error: %@",  operation.responseString);

              dispatch_async(dispatch_get_main_queue(), ^{
                  result(nil);
              });
              
          }
     ];

    [operation start];
    
}

-(void) getFile:(id)file withCompletionBlock:(void (^)(id))result {
    
    NSURL *imageurl = [NSURL URLWithString:file];
    
    NSLog(@"file - %@" , imageurl);
    
    NSURLRequest *urlReq = [NSURLRequest requestWithURL:imageurl
                                            cachePolicy:NSURLRequestReturnCacheDataElseLoad
                                        timeoutInterval:30.0];
    
    AFHTTPRequestOperation *operation = [[AFHTTPRequestOperation alloc]initWithRequest:urlReq];
    [operation  setCompletionBlockWithSuccess:^(AFHTTPRequestOperation *operation, id responseObject) {
        

        
                    NSArray   *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
                    NSString  *documentsDirectory = [paths objectAtIndex:0];
                    
                    NSString  *filePath = [[NSString stringWithFormat:@"%@/fileName.", documentsDirectory] stringByAppendingString:[file pathExtension]];
        
                    NSLog(@"SUCCESS FILE %@" , filePath );
        
                    [[NSData dataWithData:responseObject] writeToFile:filePath atomically:YES];
        
                    result(filePath);
        
            }
              failure:^(AFHTTPRequestOperation *operation, NSError *error) {

                  NSLog(@"file error - %@" , error);

                  result(nil);
                  
              }
     ];
    
    [operation start];
    
}

-(void) getFileWithSession:(id)file withCompletionBlock:(void (^)(id))completionBlock {
    
    NSURLSessionConfiguration* sessionConfig = [NSURLSessionConfiguration defaultSessionConfiguration];
    
    NSURLSession *session = [NSURLSession sessionWithConfiguration:sessionConfig
                                            delegate:self
                                       delegateQueue:[NSOperationQueue mainQueue]];

    NSString *downloadURLString = file;

    if ([downloadURLString rangeOfString:@"/"].location == NSNotFound) {
        downloadURLString = [NSString stringWithFormat:@"%@%@" , [baseUrl stringByAppendingString:@"/upload/"], file];
    }
    
    NSLog (@"Dowloading file %@" , downloadURLString);
    
    NSURL* downloadURL = [NSURL URLWithString:downloadURLString];
    
    NSURLRequest *request = [NSURLRequest requestWithURL:downloadURL];
    
    NSURLSessionDownloadTask *task = [session downloadTaskWithRequest:request];
//    NSURLSessionDownloadTask *task = [session downloadTaskWithRequest:request completionHandler:^(NSURL *location, NSURLResponse *response, NSError *error) {
//        completionBlock (location);
//        self.delegate = nil;
//    }];
    
    task.taskDescription = file;
    
    [task resume];

    
    
}

#pragma URLSession Delegate methods

- (void)         URLSession:(NSURLSession *)session
               downloadTask:(NSURLSessionDownloadTask *)downloadTask
  didFinishDownloadingToURL:(NSURL *)location
{
    NSLog(@"downloadTask:%@ didFinishDownloadingToURL:%@", downloadTask.taskDescription, location);
    
    NSFileManager *fileManager = [NSFileManager defaultManager];
    
    NSArray *URLs =
    [fileManager URLsForDirectory:NSDocumentDirectory
                        inDomains:NSUserDomainMask];
    NSURL *documentsDirectory = [URLs objectAtIndex:0];
    
    NSURL *fromURL = [[downloadTask originalRequest] URL];
    NSURL *destinationURL =
    [documentsDirectory URLByAppendingPathComponent:[fromURL
                                                     lastPathComponent]];
    
    NSError *error;
    
    // Remove file at the destination if it already exists.
    [fileManager removeItemAtURL:destinationURL error:NULL];
    
    BOOL success = [fileManager copyItemAtURL:location
                                        toURL:destinationURL error:&error];
    
    if (!success) {
        
    }
    
    
    [self.delegate didFinishDownload:destinationURL];
    
    // Copy file to your app's storage with NSFileManager
    // ...
    
    // Notify your UI
}

- (void)  URLSession:(NSURLSession *)session
        downloadTask:(NSURLSessionDownloadTask *)downloadTask
   didResumeAtOffset:(int64_t)fileOffset
  expectedTotalBytes:(int64_t)expectedTotalBytes
{
    NSLog(@"Download progress %lli of %lli" , fileOffset , expectedTotalBytes);
}

- (void)         URLSession:(NSURLSession *)session
               downloadTask:(NSURLSessionDownloadTask *)downloadTask
               didWriteData:(int64_t)bytesWritten totalBytesWritten:(int64_t)totalBytesWritten
  totalBytesExpectedToWrite:(int64_t)totalBytesExpectedToWrite
{
    double progress = (double)totalBytesWritten / (double)totalBytesExpectedToWrite;

    NSLog(@"Download progress %lli of %lli" , totalBytesWritten , totalBytesExpectedToWrite);
    
    [self.delegate downloadPercentComplete:progress];
    

}

#pragma end

-(UIImage*) getIconForFileType:(id)file {
    
    return [UIImage imageNamed:[NSString stringWithFormat:@"%@-512" , [[file pathExtension] lowercaseString]]];
    
}


@end
