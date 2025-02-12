<script lang="ts">
	import { fade } from 'svelte/transition';
  import type {User} from './UserDialog.svelte';
  import UserDialog from './UserDialog.svelte';
  
  let users = $state([] as User[])
  $effect(()=>{
    fetch('http://localhost:5000/users',{
      method: 'GET',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      headers: {
          'Content-Type': 'application/json'
      }
    })
    .then((data)=>data.json())
    .then((data)=>{
      users = data
    })
    .catch((reason)=> {
      console.error(reason)
    })    
  })
  
  let selectedUser: User = $state({});
  let isDialogOpen = $state(false);
  const updateUser = (user:User) => {
    const prevUserIndex = users.findIndex(u=>u.id===user.id);
    if(prevUserIndex > -1) {
      users[prevUserIndex] = user;
    } else {
      users.push(user);
    }
  }
  const deleteUser = (id:number|undefined) => {
    if(!id) return
    fetch(`http://localhost:5000/user/${id}`,{
      method: 'DELETE',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      headers: {
          'Content-Type': 'application/json'
      }
    })
    .then((data)=>{
      users.splice(users.findIndex(u=>u.id===id),1);
    })
    .catch((reason)=> {
      console.error(reason)
    })    
    
    
  }
</script>

<h1 class="text-dark-blue-60 border-b border-gray mb-[48px] pb-[8px]">RedSky Coding Challenge</h1>

<div class="mb-[24px] max-w-[calc(100%-100px)] mx-auto min-h-[38px]">
  <button class="wide-button float-right" onclick={()=>{selectedUser={};isDialogOpen=true;}}>Create New User</button>
</div>

<div class="max-w-[calc(100%-100px)] mx-auto border-primary border-1">
  <h2 class="">User List</h2>
  <table class="text-dark-blue-60 min-w-[100%]">
    <thead>
      <tr class="min-h-[56px]">
        {#each ["AVATAR","FIRST NAME","LAST NAME","EMAIL ADDRESS"] as title}
          <th class="py-[18px] text-left nth-1:text-center font-semibold">{title}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each users as user (user.id)}
        <tr class="border-t-1 border-gray" transition:fade>
          <td><img src={user.avatar} alt="" class="w-[40px] h-[40px] mx-auto my-[8px]" /></td>
          <td>{user.first_name}</td>
          <td>{user.last_name}</td>
          <td>{user.email}</td>
          <td class="flex gap-[24px]">
            <button class="my-[10px]" onclick={()=>{selectedUser=user;isDialogOpen=true;}}>Edit</button>
            <button class="my-[10px]" onclick={()=>{deleteUser(user.id)}}>Delete</button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<UserDialog user={selectedUser} bind:isOpen={isDialogOpen} success={updateUser} />
