<script>
  import Sidebar from '../../../extensions/vscode/webviews/components/Sidebar.svelte';
  import HelloWorld from '../../../extensions/vscode/webviews/components/HelloWorld.svelte';

</script>

<div class="bg-gray-800 min-h-screen text-white flex items-center justify-center p-5">
    <div class="w-full max-w-6xl mx-auto" style="min-width: 1920px; min-height: 1080px;">
        <header class="text-center text-xl mb-4">ProtoPi Interface</header>
        <main class="flex flex-row h-full bg-gray-900 rounded-lg shadow-xl overflow-hidden">
            <div class="w-1/3 p-4">
                <Sidebar />
            </div>
            <div class="w-2/3 p-4">
                <HelloWorld />
            </div>
        </main>
    </div>
</div>

<style global>
  @import './main.css';
</style>