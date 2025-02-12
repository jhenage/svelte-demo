<script lang="ts">
  type User = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
  //const users = $state([] as User[])
  const users: User[] = [{"id":1,"email":"george.bluth@reqres.in","first_name":"George","last_name":"Bluth","avatar":"https://reqres.in/img/faces/1-image.jpg"},{"id":2,"email":"janet.weaver@reqres.in","first_name":"Janet","last_name":"Weaver","avatar":"https://reqres.in/img/faces/2-image.jpg"},{"id":3,"email":"emma.wong@reqres.in","first_name":"Emma","last_name":"Wong","avatar":"https://reqres.in/img/faces/3-image.jpg"},{"id":4,"email":"eve.holt@reqres.in","first_name":"Eve","last_name":"Holt","avatar":"https://reqres.in/img/faces/4-image.jpg"},{"id":5,"email":"charles.morris@reqres.in","first_name":"Charles","last_name":"Morris","avatar":"https://reqres.in/img/faces/5-image.jpg"},{"id":6,"email":"tracey.ramos@reqres.in","first_name":"Tracey","last_name":"Ramos","avatar":"https://reqres.in/img/faces/6-image.jpg"}]

</script>

<h1 class="text-dark-blue-60 border-b border-gray mb-[48px] pb-[8px]">RedSky Coding Challenge</h1>

<div class="mb-[24px] max-w-[calc(100%-100px)] mx-auto min-h-[38px]">
  <button class="bg-primary text-white float-right px-[18px] py-[10px]">Create New User</button>
</div>

<div class="max-w-[calc(100%-100px)] mx-auto border-primary border-1">
  <h2 class="bg-primary text-white px-[16px] py-[9px]">User List</h2>
  <table class="text-dark-blue-60 min-w-[100%]">
    <thead>
      <tr class="min-h-[56px]">
        {#each ["AVATAR","FIRST NAME","LAST NAME","EMAIL ADDRESS"] as title}
          <th class="py-[18px] text-left nth-1:text-center font-semibold">{title}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each users as user}
        <tr class="border-t-1 border-gray">
          <td><img src={user.avatar} alt="" class="w-[40px] h-[40px] mx-auto my-[8px]" /></td>
          <td>{user.first_name}</td>
          <td>{user.last_name}</td>
          <td>{user.email}</td>
          <td class="flex gap-[24px]">
            <button class="bg-primary text-white px-[8px] py-[10px] my-[8px]">Edit</button>
            <button class="bg-primary text-white px-[8px] py-[10px] my-[8px]">Delete</button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

{#if false}
  <div class="max-w-[700px]">
    <h2 class="p-[24px]">Create New User</h2>
    <div>
      <h3>First Name</h3>
      <input type="text" />
    </div>
    <div>
      <h3>Last Name</h3>
      <input type="text" />
    </div>
    <div>
      <h3>Email Address</h3>
      <input type="text" />
    </div>
    <div>
      <h3>Avatar Image Link</h3>
      <input type="text" />
    </div>
    <div>
      <button>Cancel</button>
      <button>Create</button>
    </div>
  </div>
{/if}
