declare namespace gsap {
  function quickTo(
    target: TweenTarget,
    property: string,
    vars: any
  ): (value: any) => void;
}
