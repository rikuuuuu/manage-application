<template>
  <transition name="modal" appear>
    <div class="modal modal-overlay" @click.self="$emit('close')">
      <div class="modal-window">
        <div class="modal-content">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script></script>

<style>
.modal-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.modal-window {
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  height: fit-content;
  width: fit-content;
}

.modal-content {
  padding: 10px 20px;
}

.modal-footer {
  background: #ccc;
  padding: 10px;
  text-align: right;
}

/* オーバーレイのトランジション */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s;
}

/* オーバーレイに包含されているモーダルウィンドウのトランジション */
.modal-window {
  transition: opacity 0.4s, transform 0.2s;
}

/* ディレイを付けるとモーダルウィンドウが消えた後にオーバーレイが消える */
.modal-leave-active {
  transition: opacity 0.6s ease 0.4s transform 0.2s;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}

.modal-window {
  opacity: 10;
  transform: translateY(-20px);
  background-color: transparent;
}

@media (max-width: 769px) {
  .modal-window {
    width: 90vw;
    height: fit-content;
  }

  .approval-contents-box {
    flex: 0 0 80% !important;
  }
}
</style>
