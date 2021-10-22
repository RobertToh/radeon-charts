import { useCurrentPng } from "recharts-to-png";

export default function HookedChart(Component) {
    return function WrappedComponent(props) {
        const dlHook = useCurrentPng();
        return <Component {...props} dlHook={dlHook} />;
    }
}