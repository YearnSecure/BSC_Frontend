<template>
<div id="navigation-mobile">
    <ul class="pt-8">
     <a href="/">
      <li>Home</li>
     </a>
      <a href="/create/presale">
      <li>Create IDO</li>
      </a>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#navigation-mobile {


  ul {
    list-style: none;
    width: 200px;
    float: left;
    padding-left: 40px;

    li {
      color: #fff;
      font-weight: bold;
      margin-bottom: 10px;
      cursor: pointer;

      &:hover {
        color: #111;
      }
    }
  }
}
</style>
