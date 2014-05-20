//
//  PMImageCache.h
//  weever
//
//  Created by Ilia Ridge on 4/12/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "WEProtocols.h"


@interface PMImageCache : NSObject <NSURLSessionDelegate,NSURLSessionDownloadDelegate>

@property (nonatomic, strong) NSOperationQueue *imageOperationQueue;
//@property (nonatomic, strong) NSURLCache *cache;
@property (nonatomic, weak) id<FileDownloadProgressDelegate> delegate;
@property (nonatomic, strong) NSMutableDictionary *imagecache;


//- (void)yourMethod:(return_type (^)(var_type))blockName;
-(void) getImage:(id)image withCompletionBlock:(void (^)(id))result;
-(void) getFile:(id)file withCompletionBlock:(void (^)(id))result;
-(UIImage*) getIconForFileType:(id)file;

-(void) getFileWithSession:(id)file withCompletionBlock:(void (^)(id))completionBlock;

@end
