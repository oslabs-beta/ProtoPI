<script>
  import SidebarContainer from '../../../extensions/vscode/webviews/components/Sidebar.svelte';
  import Workshop from '../../../extensions/vscode/webviews/components/Workshop.svelte';
</script>

<div class="bg-gray-800 min-h-screen text-white flex items-center justify-center p-5">
    <div class="w-full max-w-6xl mx-auto" style="min-width: 1920px; min-height: 1080px;">
        <header class="text-center text-xl mb-4">ProtoPi Interface</header>
        <main class="flex flex-col lg:flex-row h-full bg-gray-900 rounded-lg shadow-xl overflow-hidden">
            <div class="w-full lg:w-1/3 p-4">
                <SidebarContainer />
            </div>

            <div class="w-full lg:w-2/3 p-4">
              <Workshop />
            </div>
        </main>
    </div>
</div>

<style global>
  @import './main.css';
</style>