/**
 * New node file
 */
 
/**
function doSomething(args, callback) {
	somethingComplicated(args);
	callback();
	//process.nextTick(callback);
}

function ca1(args){
   console.info("==="+args+"=="); 
}

function somethingComplicated(args){
      setTimeout(ca1, 10000, "aa");
      console.info("===this=="); 
}

function compute(){
      setTimeout(ca1, 1000, "bb");
      console.info("===that=="); 
}


doSomething("data", function onEnd() {
    console.info("===cc==");
	compute();
});
**/
function asyncFake(data, callback) { 
        console.info("===vv1==");   
        console.info("===vv2=="); 
        console.info("===vv3=="); 
        console.info("===vv3=="); 
        
	    if(data === 'foo') 
	       //callback(true);
	       process.nextTick(callback);
	    else 
	      // callback(false);
	      process.nextTick(callback);
	    console.info("===vv4==");    
}

function ca1(args){
   console.info("==="+args+"=="); 
}
	 
asyncFake('bar', function(result) {
      //  setTimeout(ca1, 1000, "bb");
       console.info("===bb3==");   
        console.info("===bb4=="); 
        setTimeout(ca1, 1000, "bb");  
         console.info("===bb5==");   
});

