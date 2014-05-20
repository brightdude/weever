//
//  ControllerInfo.m
//  ADVFlatUI
//
//  Created by Tope on 06/06/2013.
//  Copyright (c) 2013 App Design Vault. All rights reserved.
//

#import "ControllerInfo.h"

@implementation ControllerInfo

-(id)initWithName:(NSString*)name andControllerId:(NSString*)controllerId{
    
    self = [super init];
    
    if(self){
        
        self.name = name;
        self.controllerId = controllerId;
    }
    
    return self;
}
@end
