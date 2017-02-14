'use strict'

class DataSource{
    fetchFeed(cb){
        fetch('http://test.norgta.com/public/api/v1/cs_work', {
            method: 'GET',
            headers: {
              'Authortoken' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxODc4NSIsImV4cGlyZWQiOjE0ODkwODk2MDAsImxhc3Rsb2dpbiI6MTQ4MzA0NzU4OH0.EPjeu-klo-ygKwUvdyVspIWeaHoosCNPdaa1pO4_RsY',
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
          })
          .then((response)=>{return response.json()})
          .then((response) =>{

              if(response){
                return cb(response);
              }
          })
          .catch((err) => {
            console.log(err);
          });
    }
    fetchAdd(input,cb){
        // var data = new FormData();
        // data.append( "json", JSON.stringify(newData));
        if(input,cb){
           console.log(input)
           var convertUid=Number(input.uid);
           var convertZone=Number(input.zone);
            fetch('http://test.norgta.com/public/api/v1/cs_work', {
                method: 'POST',
                headers: {
                  'Authortoken' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxODc4NSIsImV4cGlyZWQiOjE0ODkwODk2MDAsImxhc3Rsb2dpbiI6MTQ4MzA0NzU4OH0.EPjeu-klo-ygKwUvdyVspIWeaHoosCNPdaa1pO4_RsY',
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                  "uid":convertUid,
                  "zone":convertZone,
                  "valid_from":input.start_time,
                  "valid_to":input.end_time
                })
              })

              .then((response)=>{return response.json()})

              .then((response)=>{
                if(response.ev_result === 0){
                  return cb({success:true});
                }else{
                  return cb({success:false});
                }})
              .catch((err) => {
                console.log(err)
                return cb(err);
              });
          }
    }
    fetchUpate(input,cb){
        // var data = new FormData();
        // data.append( "json", JSON.stringify(newData));
        if(input,cb){
           
           var converIntUID=Number(input.uid);
           var converIntID=Number(input.id);
           var converIntZone=Number(input.zone);
            fetch('http://test.norgta.com/public/api/v1/cs_work', {
                method: 'PUT',
                headers: {
                  'Authortoken' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxODc4NSIsImV4cGlyZWQiOjE0ODkwODk2MDAsImxhc3Rsb2dpbiI6MTQ4MzA0NzU4OH0.EPjeu-klo-ygKwUvdyVspIWeaHoosCNPdaa1pO4_RsY',
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                  "uid":converIntUID,
                  "valid_from":input.valid_from,
                  "valid_to":input.valid_to,
                  "id":converIntID,
                  "zone":converIntZone,

                })
              })

              .then((response)=>{return response.json()})
              .then((response)=>{
                  console.log(response)
              })
              .then(()=>{return cb({
                    success:true,
                    start_time:input.valid_from,
                    end_time:input.valid_to,
                    start_datetime:input.valid_from,
                    end_datetime:input.valid_to
                  })})
              .catch((err) => {
                console.log(err)
                return cb(err);
              });
          }
    }



    fetchSearch(cb){

        fetch('http://test.norgta.com/public/api/v1/cs_work', {
            method: 'GET',
            headers: {
              'Authortoken' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxODc4NSIsImV4cGlyZWQiOjE0ODkwODk2MDAsImxhc3Rsb2dpbiI6MTQ4MzA0NzU4OH0.EPjeu-klo-ygKwUvdyVspIWeaHoosCNPdaa1pO4_RsY',
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
          })


            .then((response)=>{return response.json()})
            .then((response)=>{
              // var Objkey=Object.keys(response.ea_data)
              //   console.log(Objkey)
              // var matchedUID = response.ea_data.map(input,(Objkey)=>{
              //   var Objkey=Object.keys(response.ea_data)
              //     console.log(Objkey)
              // })


              // console.log(typeof input.userInput)
              //////////////////////////搜索功能

                    // var found = 0;
                    // var res = [];

                    // for(var i = 0; i < response.ea_data.length; i+=1){
                    //   ////精确搜索
                    //       if(input.userInput == response.ea_data[i].uid){
                    //         // searchKey = Object.keys(response.ea_data[i]);
                    //
                    //         found = 1;
                    //         return cb(response.ea_data[i]);
                    //       }
                    //   /////////////
                    //       console.log(response.ea_data[i].username.toLowerCase().indexOf(input.userInput.toLowerCase()) != -1)
                    //       if(response.ea_data[i].username.toLowerCase().indexOf(input.userInput.toLowerCase()) != -1){
                    //           found = 1;
                    //
                    //           res.push(response.ea_data[i]);
                    //
                    //       }
                    // }

                    // return res=response.ea_data.map((match)=>{
                    //
                    //     if(match.username.toLowerCase().indexOf(input.userInput.toLowerCase()) != -1){
                    //         found = 1;
                    //         // return res.push(match);
                    //
                    //     }
                    //   })


                      //
                      // if(found == 0){
                      //
                      //   return cb();
                      // }



                ////////////搜索功能


                return cb(response);


            })

            .catch((err) => {

              return cb(err);
            });


    }




}
module.exports = new DataSource();
