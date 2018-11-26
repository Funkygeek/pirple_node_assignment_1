# pirple_node_assignment_1
Assignment one for Node.js Master Class @ https://pirple.thinkific.com

---
## A simple node.js API. 

Execute by :  
`NODE_ENV=staging node index.js` for staging, 
or `NODE_ENV=production node index.js` for production.

The only route supported is `/hello`

If starting as staging, the port is `3000`.

If starting as production, the post is `5000`.

#####Example usage
For `production`, execute on the command line:
       
       NODE_ENV=production node index.js
       
To see the outcome execute:
    
        curl localhost:5000/hello
       
For `staging`, execute on the command line:
       
       NODE_ENV=staging node index.js
       
To see the outcome execute:
    
        curl localhost:3000/hello
       
