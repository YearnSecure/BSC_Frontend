<template>
<div id="navigation-mobile">
    <ul class="pt-8">
     <a href="/">
      <li class="underline">Home</li>
     </a>
      <a href="/create/presale">
      <li class="underline">Create IDO</li>
      </a>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
#navigation-mobile {

  .open {
  transform: translateX(20%);
  transition: 2s transform cubic-bezier(0,.12,.14,1);
  transition: 1s;
    left: 0;
  }

  ul {
    list-style: none;
    width: 200px;
    float: left;
    padding-left: 40px;
     text-decoration: 1px white;

    li {
      color: #fff;
      font-weight: bold;
      margin-bottom: 10px;
      cursor: pointer;

       &:hover {
        color: #f59e0b;
      }
    }
  }
}
</style>
