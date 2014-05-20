//
//  WEPreviewController.m
//  weever
//
//  Created by Ilia Ridge on 4/18/14.
//  Copyright (c) 2014 Luwei. All rights reserved.
//

#import "WEPreviewController.h"
#import "UIAlertView+Additions.h"


@interface WEPreviewController ()

@end

@implementation WEPreviewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (id)initWithFileName:(NSString *)fileName
{
    self = [super init];
    if (self) {
        self.dataSource = self;
        self.delegate = self;
        self.previewUrl = [NSURL URLWithString:fileName];
    }
    return self;
}

- (id)initWithUrl:(NSURL*)url
{
    self = [super init];
    if (self) {
        self.dataSource = self;
        self.delegate = self;
        self.previewUrl = url;
    }
    return self;
}

-(id)initWithData:(NSData*)data withFile:(NSString*)file {
    
    self = [super init];
    if (self) {
        
        self.dataSource = self;
        self.delegate = self;

    }
    
    NSFileManager *fileManager = [NSFileManager defaultManager];
    
    NSArray *URLs =
    [fileManager URLsForDirectory:NSDocumentDirectory
                        inDomains:NSUserDomainMask];
    NSURL *documentsDirectory = [URLs objectAtIndex:0];
    
    NSURL *destinationURL = [documentsDirectory URLByAppendingPathComponent:file];
    
    NSError *error;
    
    [fileManager removeItemAtURL:destinationURL error:&error];
    
    [data writeToURL:destinationURL atomically:YES];
    
    self.previewUrl = destinationURL;
    
    return self;


}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

+ (UIViewController*) previewController {

    UIWindow* mainWindow = [[UIApplication sharedApplication] keyWindow];
    
    return [mainWindow visibleViewController];

}

-(void) showPreview {
    
    UIWindow* mainWindow = [[UIApplication sharedApplication] keyWindow];
    
    self.vc = [mainWindow visibleViewController];

    [self.vc  presentViewController:self animated:YES completion:^(void){
        
    }];

}

- (NSInteger)numberOfPreviewItemsInPreviewController:(QLPreviewController *)controller {
    return 1;
}

- (id <QLPreviewItem>)previewController:(QLPreviewController *)controller previewItemAtIndex:(NSInteger)index {

    NSLog (@"Ready To show");

    return self.previewUrl;
    
}

- (BOOL)previewController:(QLPreviewController *)controller shouldOpenURL:(NSURL *)url forPreviewItem:(id <QLPreviewItem>)item {
    return YES;
}


/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
