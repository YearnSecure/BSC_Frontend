<template>
    <div class="relative py-16 bg-gray-100 dark:bg-gray-900 overflow-hidden">
      <div class="relative px-4 sm:px-6 lg:px-8">
        <div class="text-lg w-1/2 mx-auto">
          <h1>
            <span class="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-yellow-500 sm:text-4xl">Privacy policy</span>
          </h1>
          <p class="mt-8 text-xl text-gray-500 leading-8">
           YSEC takes your privacy seriously. To better protect your privacy YSEC provide this privacy policy notice explaining the way your personal information is collected and used.
          </p>
        </div>
        <div class="mt-6 text-lg w-1/2 mx-auto">
          <div class="text-lg max-w-prose mx-auto">
            <h1>
              <span class="mt-2 block text-2xl text-center leading-8 font-extrabold tracking-tight text-yellow-500 sm:text-4xl">Collection of Routine Information</span>
            </h1>
            <p class="mt-8 text-xl text-gray-500 leading-8">
              This website tracks basic information about its visitors. This information includes, but is not limited to, IP addresses, browser details, timestamps and referring pages. None of this information can personally identify the specific user to this website. The information is tracked for routine administration and maintenance purposes.
            </p>
          </div>
        </div>
        <div class="mt-6 text-lg w-1/2 mx-auto">
          <div class="text-lg max-w-prose mx-auto">
            <h1>
              <span class="mt-2 block text-2xl text-center leading-8 font-extrabold tracking-tight text-yellow-500 sm:text-4xl">Cookies</span>
            </h1>
            <p class="mt-8 text-xl text-gray-500 leading-8">
              Where necessary, this website uses cookies to store information about a visitor’s preferences and history in order to better serve the user and/or present the user with customized content.
            </p>
          </div>
        </div>
        <div class="mt-6 text-lg w-1/2 mx-auto">
          <div class="text-lg max-w-prose mx-auto">
            <h1>
              <span class="mt-2 block text-2xl text-center leading-8 font-extrabold tracking-tight text-yellow-500 sm:text-4xl">Security</span>
            </h1>
            <p class="mt-8 text-xl text-gray-500 leading-8">
              The security of your personal information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee it's absolute security.
            </p>
          </div>
        </div>
        <div class="mt-6 text-lg w-1/2 mx-auto">
          <div class="text-lg max-w-prose mx-auto">
            <h1>
              <span class="mt-2 block text-2xl text-center leading-8 font-extrabold tracking-tight text-yellow-500 sm:text-4xl">Changes To This Privacy Policy</span>
            </h1>
            <p class="mt-8 text-xl text-gray-500 leading-8">
              This Privacy Policy is effective as of 01/01/2021 and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page. YSEC reserve the right to update or change this Privacy Policy at any time and you should check this Privacy Policy periodically. If YSEC makes any material changes to this Privacy Policy, YSEC will notify you by placing a prominent notice on this website.
            </p>
          </div>
        </div>
        <div class="mt-6 text-lg w-1/2 mx-auto">
          <router-link
              :to="{ name: 'dashboard'}"
              class="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-yellow-500 hover:bg-yellow-600">
            Back to dashboard
          </router-link>
        </div>
      </div>
    </div>
</template>


<script>
export default {
  name: "privacy-policy.views"
}
</script>
