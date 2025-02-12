<script lang="ts" module>
	import { scale } from "svelte/transition";

  export type User = {
    id?: number;
    email?: string;
    first_name?: string;
    last_name?: string;
    avatar?: string;
  };
</script>
<script lang="ts">  
  let { 
    user:parentUser,
    isOpen = $bindable(false), 
    success 
  } = $props();
  
  let message = $state('');
  let user = $state(parentUser||{}) as User;
  $effect(()=>{
    let parentUser2 = JSON.parse(JSON.stringify(parentUser)) as User
    user = {
      id:parentUser2.id,
      email:parentUser2.email||'',
      first_name:parentUser2.first_name||'',
      last_name:parentUser2.last_name||'',
      avatar:parentUser2.avatar||'',
    } as User;
  })
  const cancel = () => {
    isOpen=false;
    message='';
  }
  const save = () => {
    message = '...Saving';
    if(!user.email || !user.first_name || !user.last_name || !user.avatar) {
      message = 'Required fields';
      return;
    }

    fetch('http://localhost:5000/user',{
      method: user.id?'PUT':'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then((data)=>data.json())
    .then((data)=> {
      if(typeof success === 'function') { 
        if(!data?.user?.id) { 
          console.error(data); 
          throw data.error || 'Something went wrong'; 
        }
        success(data.user);
      }
      cancel();
    })
    .catch((reason)=> {
      message = `Error: ${reason}`;
    })
  }
</script>

{#if isOpen}
<div class="fixed inset-0 flex items-center justify-center bg-secondary/60 z-50" onclick={cancel} role="presentation">
  <div class="bg-white shadow-lg max-w-[700px] w-[calc(100%-40px)] max-h-[calc(100%-40px)] overflow-auto" onclick={(e)=>e.stopPropagation()} role="presentation" transition:scale>
    <h2 class="p-[24px]!">{user.id ? 'Edit' : 'Create New'} User</h2>
    <div class="p-[24px] ">
      <h3>First Name</h3>
      <input type="text" required bind:value={user.first_name} />
      <h3 class="mt-[24px]">Last Name</h3>
      <input type="text" required bind:value={user.last_name} />
      <h3 class="mt-[24px]">Email Address</h3>
      <input type="text" required bind:value={user.email} />
      <h3 class="mt-[24px]">Avatar Image Link</h3>
      <input type="text" required bind:value={user.avatar} />
      <div class="text-right">{message}</div>
      <div class="mt-[82px] flex gap-[24px] flex-row-reverse">
        <button class="button-wide" onclick={save} >{user.id ? 'Save' : 'Create'}</button>
        <button class="button-wide button-cancel" onclick={cancel}>Cancel</button>
      </div>
    </div>
  </div>
</div>
{/if}