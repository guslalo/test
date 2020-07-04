// replace these values with those generated in your TokBox Account
var apiKey = "46621542";
var sessionId = "2_MX40NjYyMTU0Mn5-MTU5MzgwODE0NDcwMX5mQXBjTUpBNWlpQXhld1BGKytoNGhZSG9-fg";
var token = "T1==cGFydG5lcl9pZD00NjYyMTU0MiZzaWc9NmY2OTkyNThmZjgzMDIwNjFkMmQxZWJmNDA1ODA0ZWQ1YjE4NDZhMzpzZXNzaW9uX2lkPTJfTVg0ME5qWXlNVFUwTW41LU1UVTVNemd3T0RFME5EY3dNWDVtUVhCalRVcEJOV2xwUVhobGQxQkdLeXRvTkdoWlNHOS1mZyZjcmVhdGVfdGltZT0xNTkzODA4MTU4Jm5vbmNlPTAuMzcxMjQ0MTI2MDczMTk3NTcmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTU5NjQwMDE1OCZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==";

// (optional) add server code here
initializeSession();
// Handling all of our errors here by alerting them
function handleError(error) {
    if (error) {
      alert(error.message);
    }
  }
  
  function initializeSession() {
    var session = OT.initSession(apiKey, sessionId);
  
    // Subscribe to a newly created stream
    session.on('streamCreated', function(event) {
        session.subscribe(event.stream, 'subscriber', {
          insertMode: 'append',
          width: '100%',
          height: '100%'
        }, handleError);
      });
  
    // Create a publisher
    var publisher = OT.initPublisher('publisher', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError);
  
    // Connect to the session
    session.connect(token, function(error) {
      // If the connection is successful, publish to the session
      if (error) {
        handleError(error);
      } else {
        session.publish(publisher, handleError);
      }
    });
  }