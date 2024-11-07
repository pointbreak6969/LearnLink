import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import * as Icons from "lucide-react";
import { TOOLS } from "./constant";
import { setCurrentTool, updateToolSetting } from "@/store/toolsSlice";
import { Card } from "../ui/card";

export const Toolbar = ({ onUndo, onRedo }) => {
  const dispatch = useDispatch();
  const currentTool = useSelector((state) => state.tools.currentTool);
  const toolSettings = useSelector((state) => state.tools.toolSettings);
  const history = useSelector((state) => state.history);

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2">
        {TOOLS.map(({ id, icon, label }) => {
          const Icon = Icons[icon];
          return (
            <Popover key={id}>
              <PopoverTrigger asChild>
                <Button
                  variant={currentTool === id ? "default" : "outline"}
                  size="icon"
                  className="w-10 h-10 relative"
                  onClick={() => dispatch(setCurrentTool(id))}
                >
                  <Icon className="w-5 h-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-40 p-2">
                <div className="space-y-2">
                  <p className="text-sm font-medium">{label} Width</p>
                  <Slider
                    value={[toolSettings[id].width]}
                    onValueChange={(value) =>
                      dispatch(
                        updateToolSetting({
                          tool: id,
                          setting: "width",
                          value: value[0],
                        })
                      )
                    }
                    max={20}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
              </PopoverContent>
            </Popover>
          );
        })}

        <div className="h-6 w-px bg-border mx-2" />
        <Button
          variant="outline"
          size="icon"
          onClick={onUndo}
          disabled={history.past.length === 0}
        >
          <Icons.Undo2 className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onRedo}
          disabled={history.future.length === 0}
        >
          <Icons.Redo2 className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};
