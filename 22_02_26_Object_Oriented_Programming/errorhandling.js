function bootNavigation(mapLoaded){

    try {
        console.log(`Is Navigation Map Loaded: ${mapLoaded}`);
        
        if(!mapLoaded){
            throw new Error("Navigation Map is not loaded");
        }

        return "Navigation Started";
    } catch (error) {

        console.log(error);
        console.log("Naviagation Failed");
        
    }finally{
        console.log("Boot Navigation Process Completed");
    }

}


// const status1 = bootNavigation(true);
// console.log(`Status 1: ${status1}`);

const status2 = bootNavigation(false);
console.log(`Status 2: ${status2}`);


/*

try is used to run code that might cause an error
catch is used to handle the error if it occurs
throw is used to manually create an error
finally is used to run code no matter what happens

Behavior:
When an error occurs inside try, execution immediately stops
Control jumps to the nearest catch block
Code after the error inside try does not execute


Execution Flow:
Run try block
If no error → skip catch, go to finally
If error occurs → jump to catch
After catch, continue normal execution
finally always runs

throw stops execution and signals an error
If error is not caught → it propagates upward and may crash the program
catch allows you to recover and continue execution
finally runs even if there is a return or error

Point to remember: 
The code in the finally is executed firest rather than the return from try or catch block. 
So, if there is a return statement in try or catch, the finally block will execute before the return statement is executed.

*/